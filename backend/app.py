from flask import Flask, request, jsonify

from flask_cors import CORS

import os

from rag_pipeline import (
    create_vector_store,
    ask_question
)



app = Flask(__name__)

CORS(app)



# Upload Folder
UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)



# Upload PDF API
@app.route('/upload', methods=['POST'])
def upload_pdf():

    if 'file' not in request.files:

        return jsonify({
            'error': 'No file uploaded'
        }), 400



    file = request.files['file']



    if file.filename == '':

        return jsonify({
            'error': 'No selected file'
        }), 400



    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )



    file.save(filepath)



    # Create Vector Store
    create_vector_store(filepath)



    return jsonify({
        'message': 'PDF uploaded successfully'
    })



# Search API
@app.route('/search', methods=['POST'])
def search():

    data = request.get_json()

    query = data.get('query')



    if not query:

        return jsonify({
            'error': 'Query is required'
        }), 400



    result = ask_question(query)



    return jsonify(result)



# Run Server
if __name__ == '__main__':

    app.run(
        debug=True,
        port=5000
    )