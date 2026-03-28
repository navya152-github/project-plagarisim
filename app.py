from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from model import check_similarity
import re

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {
    'documents': {'txt', 'pdf', 'doc', 'docx'},
    'code': {'py', 'java', 'cpp', 'c', 'js', 'html', 'css', 'sql', 'json'}
}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename, file_type='documents'):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS.get(file_type, set())

def get_file_type(filename):
    ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
    if ext in ALLOWED_EXTENSIONS['code']:
        return 'code'
    return 'documents'

def read_file_content(filepath, filename):
    """Read content from different file types"""
    ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
    
    try:
        if ext == 'txt':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext == 'py':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext == 'java':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext in ['cpp', 'c']:
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext == 'js':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext == 'html':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext == 'css':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext == 'sql':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        elif ext == 'json':
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        
        # For PDF and DOC files, you would need additional libraries
        # For now, return a placeholder
        elif ext == 'pdf':
            return "PDF content extraction requires additional libraries (PyPDF2, pdfplumber)"
        
        elif ext in ['doc', 'docx']:
            return "DOC/DOCX content extraction requires additional libraries (python-docx)"
        
        else:
            return "Unsupported file format"
            
    except Exception as e:
        return f"Error reading file: {str(e)}"

def extract_code_features(content):
    """Extract features from code for better plagiarism detection"""
    features = {
        'imports': [],
        'functions': [],
        'variables': [],
        'comments': [],
        'structure': []
    }
    
    # Extract imports/includes
    import_patterns = [
        r'import\s+(\w+)',
        r'#include\s*[<"]([^>"]+)[>"]',
        r'using\s+(\w+)',
        r'package\s+(\w+)'
    ]
    
    for pattern in import_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        features['imports'].extend(matches)
    
    # Extract function definitions
    function_patterns = [
        r'def\s+(\w+)\s*\(',
        r'function\s+(\w+)\s*\(',
        r'\w+\s+(\w+)\s*\([^)]*\)\s*{',
        r'\w+\s+(\w+)\s*\([^)]*\)\s*;',
        r'CREATE\s+FUNCTION\s+(\w+)'
    ]
    
    for pattern in function_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        features['functions'].extend(matches)
    
    # Extract variables (simple pattern)
    var_pattern = r'\b(int|float|string|char|bool|var|let|const)\s+(\w+)\s*[=;]'
    matches = re.findall(var_pattern, content, re.IGNORECASE)
    features['variables'].extend(matches)
    
    # Extract comments
    comment_patterns = [
        r'#.*$',  # Python/Shell comments
        r'//.*$',  # C-style comments
        r'/\*.*?\*/',  # Multi-line comments
        r'<!--.*-->',  # HTML comments
        r'--.*$',  # SQL comments
    ]
    
    for pattern in comment_patterns:
        matches = re.findall(pattern, content, re.MULTILINE | re.DOTALL)
        features['comments'].extend([m.strip() for m in matches if m.strip()])
    
    return features

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file selected'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400
    
    filename = secure_filename(file.filename)
    file_type = get_file_type(filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    try:
        file.save(filepath)
        
        # Read file content
        content = read_file_content(filepath, filename)
        
        # Extract features if it's a code file
        if file_type == 'code':
            features = extract_code_features(content)
        else:
            features = {}
        
        # Perform plagiarism detection
        result = check_similarity(content, file_type)
        
        # Add file metadata to result
        result.update({
            'filename': filename,
            'file_type': file_type,
            'file_size': os.path.getsize(filepath),
            'features': features,
            'content_preview': content[:500] + '...' if len(content) > 500 else content
        })
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify({'success': True, 'result': result})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/compare_texts', methods=['POST'])
def compare_texts():
    text1 = request.form.get("text1", "")
    text2 = request.form.get("text2", "")
    
    if not text1 and not text2:
        return jsonify({'error': 'Please enter at least one text to compare'}), 400
    
    result = check_similarity(text1 if text1 else text2, 'text')
    result.update({
        'comparison_mode': True,
        'text1_length': len(text1),
        'text2_length': len(text2)
    })
    
    return jsonify(result)

@app.route('/history')
def get_history():
    # This would typically come from a database
    # For demo purposes, return sample history
    sample_history = [
        {
            'id': 1,
            'filename': 'sample.py',
            'file_type': 'code',
            'percentage': 25,
            'date': '2024-03-28 10:30:00',
            'sources_found': 3
        },
        {
            'id': 2,
            'filename': 'essay.txt',
            'file_type': 'document',
            'percentage': 15,
            'date': '2024-03-28 09:45:00',
            'sources_found': 2
        }
    ]
    return jsonify(sample_history)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)