from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_community.vectorstores import FAISS

from langchain_community.llms import Ollama

import os



# Embedding Model
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)



# Load LLM
llm = Ollama(
    model="phi3"
)



# Create Vector Database
def create_vector_store(pdf_path):

    loader = PyPDFLoader(pdf_path)

    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=700,
        chunk_overlap=100
    )

    docs = text_splitter.split_documents(documents)

    vector_store = FAISS.from_documents(
        docs,
        embedding_model
    )

    vector_store.save_local("vector_store")

    return True



# Ask Question
def ask_question(query):

    vector_store = FAISS.load_local(
        "vector_store",
        embedding_model,
        allow_dangerous_deserialization=True
    )

    # Retrieve Relevant Docs
    docs = vector_store.similarity_search(
        query,
        k=2
    )

    # Combine Context
    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )



    # Prompt
    prompt = f"""
You are an AI document retrieval assistant.

Answer ONLY using the provided document context.

IMPORTANT RULES:
- Answer ONLY the exact question asked.
- Do NOT include extra related topics unless asked.
- Do NOT use external knowledge.
- Do NOT make up information.
- If answer is unavailable say:
"Information not found in uploaded documents."

FORMATTING RULES:
- Keep answers concise and focused.
- Use professional formatting.
- If user asks for points, lists, technologies, or bullet format,
  provide clean numbered points.
- Keep each point separate and readable.
- Do NOT combine multiple points into one paragraph.

QUESTION:
{query}

CONTEXT:
{context}

ANSWER:
"""



    # Generate Response
    response = llm.invoke(prompt).strip()



    # Source
    source = docs[0].metadata.get(
        "source",
        "Unknown"
    )



    return {
        "answer": response,
        "source": os.path.basename(source)
    }