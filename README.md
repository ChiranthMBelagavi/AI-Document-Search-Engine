# AI-Document-Search-Engine

AI-powered Document Search Engine built with RAG, LangChain, FAISS, Hugging Face embeddings, and Ollama LLM. Enables PDF upload, semantic search, and context-aware question answering through REST APIs and an interactive user interface.

## Features

* PDF document upload
* Semantic search using FAISS vector database
* Context-aware question answering
* Hugging Face embeddings
* Ollama LLM integration
* React-based frontend UI
* Flask REST API backend

---

## Install Ollama

Download and install Ollama:

https://ollama.com

Run the model:

```bash
ollama run llama3
```

---

## Backend Setup

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
python app.py
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://127.0.0.1:5000
```
