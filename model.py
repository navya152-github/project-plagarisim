from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')

def check_similarity(text1, text2):

    embeddings = model.encode([text1, text2])

    similarity = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    return round(similarity * 100, 2)

import re
import hashlib
import json
from difflib import SequenceMatcher
import random

class CodePlagiarismDetector:
    def __init__(self):
        # Sample code patterns database (in real app, this would be a database)
        self.code_patterns = {
            'python': [
                'import numpy as np',
                'def main():',
                'if __name__ == "__main__":',
                'for i in range(len(arr)):',
                'print(f"Result: {result}")',
                'return result'
            ],
            'java': [
                'public static void main(String[] args)',
                'import java.util.Scanner',
                'System.out.println(',
                'public class',
                'private String',
                'return result;'
            ],
            'javascript': [
                'function calculate()',
                'const result =',
                'console.log(',
                'document.getElementById(',
                'addEventListener(',
                'return result;'
            ],
            'cpp': [
                '#include <iostream>',
                'using namespace std;',
                'int main()',
                'cout <<',
                'return 0;'
            ],
            'c': [
                '#include <stdio.h>',
                'int main()',
                'printf(',
                'return 0;'
            ],
            'html': [
                '<!DOCTYPE html>',
                '<html lang="en">',
                '<head>',
                '<body>',
                '<div class=',
                '<script src=',
                '</html>'
            ],
            'css': [
                '@media screen and',
                '.container {',
                'display: flex;',
                'background-color:',
                'margin: 0 auto;'
            ],
            'sql': [
                'SELECT * FROM',
                'WHERE id =',
                'INSERT INTO',
                'CREATE TABLE',
                'PRIMARY KEY'
            ],
            'json': [
                '"name":',
                '"type":',
                '"value":',
                '"items": [',
                '"data": {'
            ]
        }
        
        # Common code structures
        self.common_structures = {
            'loops': ['for(', 'while(', 'foreach(', 'for each'],
            'conditionals': ['if(', 'else if(', 'switch(', 'case '],
            'functions': ['function ', 'def ', 'public ', 'private ', 'static '],
            'classes': ['class ', 'public class ', 'interface '],
            'imports': ['import ', '#include ', 'using ', 'package ']
        }

    def extract_code_tokens(self, content):
        """Extract meaningful tokens from code"""
        # Remove comments and strings
        content_no_comments = re.sub(r'//.*?$|/\*.*?\*/|#.*$|\'[^\']*\'|"[^"]*"', '', content, flags=re.MULTILINE | re.DOTALL)
        
        # Extract identifiers and keywords
        tokens = re.findall(r'\b[a-zA-Z_][a-zA-Z0-9_]*\b', content_no_comments)
        
        # Extract function names
        functions = re.findall(r'(?:def|function|public|private|static)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(', content)
        
        # Extract variable names
        variables = re.findall(r'\b(?:int|float|string|char|bool|var|let|const)\s+([a-zA-Z_][a-zA-Z0-9_]*)', content)
        
        return {
            'tokens': tokens,
            'functions': functions,
            'variables': variables,
            'unique_tokens': len(set(tokens))
        }

    def calculate_code_similarity(self, content1, content2, file_type):
        """Calculate similarity between code files"""
        tokens1 = self.extract_code_tokens(content1)
        tokens2 = self.extract_code_tokens(content2)
        
        # Token-based similarity
        common_tokens = set(tokens1['tokens']) & set(tokens2['tokens'])
        token_similarity = len(common_tokens) / max(len(set(tokens1['tokens'])), len(set(tokens2['tokens']))) * 100
        
        # Function name similarity
        common_functions = set(tokens1['functions']) & set(tokens2['functions'])
        function_similarity = len(common_functions) / max(len(set(tokens1['functions'])), len(set(tokens2['functions']))) * 100
        
        # Structure similarity
        structure_similarity = 0
        for structure_type, patterns in self.common_structures.items():
            matches1 = sum(1 for pattern in patterns if pattern in content1.lower())
            matches2 = sum(1 for pattern in patterns if pattern in content2.lower())
            structure_similarity += min(matches1, matches2)
        
        structure_similarity = structure_similarity / (len(self.common_structures) * 2) * 100
        
        # Weighted average
        overall_similarity = (
            token_similarity * 0.5 +
            function_similarity * 0.3 +
            structure_similarity * 0.2
        )
        
        return {
            'overall_similarity': min(overall_similarity, 100),
            'token_similarity': token_similarity,
            'function_similarity': function_similarity,
            'structure_similarity': structure_similarity,
            'common_tokens': list(common_tokens)[:10],  # Show top 10 common tokens
            'common_functions': list(common_functions)[:5]   # Show top 5 common functions
        }

    def find_code_sources(self, content, file_type):
        """Find potential sources for code plagiarism"""
        sources = []
        detected_patterns = []
        
        # Check against known patterns
        if file_type in self.code_patterns:
            for pattern in self.code_patterns[file_type]:
                if pattern.lower() in content.lower():
                    detected_patterns.append(pattern)
        
        # Generate mock sources based on detected patterns
        if detected_patterns:
            source_types = ['GitHub Repository', 'Stack Overflow', 'Tutorial Website', 'Code Documentation', 'Sample Project']
            
            for i, pattern in enumerate(detected_patterns[:3]):  # Top 3 matches
                similarity = random.randint(60, 95)  # High similarity for direct matches
                sources.append({
                    'name': f'{source_types[i % len(source_types)]} {i+1}',
                    'url': f'www.example-code-{i+1}.com',
                    'percentage': similarity,
                    'matched_content': f'Pattern match: "{pattern[:50]}..."',
                    'pattern': pattern
                })
        
        # Add some generic sources for lower similarity
        if len(sources) < 5:
            generic_sources = [
                {'name': 'Online Code Repository', 'url': 'github.com', 'base_content': 'Code snippets'},
                {'name': 'Programming Forum', 'url': 'stackoverflow.com', 'base_content': 'Q&A discussions'},
                {'name': 'Tutorial Site', 'url': 'tutorialspoint.com', 'base_content': 'Learning materials'},
                {'name': 'Documentation', 'url': 'docs.python.org', 'base_content': 'Official docs'},
                {'name': 'Code Library', 'url': 'npmjs.com', 'base_content': 'Package libraries'}
            ]
            
            for i, source in enumerate(generic_sources[:5-len(sources)]):
                similarity = random.randint(10, 40)  # Lower similarity for generic matches
                sources.append({
                    'name': source['name'],
                    'url': source['url'],
                    'percentage': similarity,
                    'matched_content': f'{source["base_content"]} similarity detected',
                    'pattern': None
                })
        
        return sorted(sources, key=lambda x: x['percentage'], reverse=True)

def check_similarity(content, file_type='text'):
    """Main function to check plagiarism"""
    try:
        # Handle different file types
        if file_type == 'code':
            detector = CodePlagiarismDetector()
            
            # For demo, compare with sample code database
            sample_codes = {
                'python': 'import numpy as np\ndef main():\n    if __name__ == "__main__":\n        main()',
                'java': 'public static void main(String[] args) {\n    System.out.println("Hello World");\n}',
                'javascript': 'function calculate() {\n    const result = 42;\n    return result;\n}',
                'cpp': '#include <iostream>\nint main() {\n    std::cout << "Hello";\n    return 0;\n}'
            }
            
            # Calculate similarity with sample codes
            similarities = []
            for lang, sample_code in sample_codes.items():
                similarity_result = detector.calculate_code_similarity(content, sample_code, lang)
                similarities.append(similarity_result['overall_similarity'])
            
            # Find sources
            sources = detector.find_code_sources(content, file_type)
            
            # Calculate overall percentage
            overall_percentage = max(similarities) if similarities else random.randint(5, 25)
            
            return {
                'overall_percentage': overall_percentage,
                'sources': sources[:5],  # Top 5 sources
                'file_type': file_type,
                'analysis_type': 'code_plagiarism',
                'details': {
                    'similarities': similarities,
                    'language_detected': detect_language(content),
                    'code_metrics': detector.extract_code_tokens(content)
                }
            }
        
        else:
            # Handle text files (original functionality)
            text_similarity = calculate_text_similarity(content)
            sources = generate_text_sources(content)
            
            return {
                'overall_percentage': text_similarity,
                'sources': sources,
                'file_type': file_type,
                'analysis_type': 'text_plagiarism',
                'details': {
                    'word_count': len(content.split()),
                    'character_count': len(content)
                }
            }
    
    except Exception as e:
        return {
            'error': f'Analysis failed: {str(e)}',
            'overall_percentage': 0,
            'sources': [],
            'file_type': file_type
        }

def calculate_text_similarity(content):
    """Calculate text similarity using various methods"""
    # Simple text similarity calculation
    sentences = content.split('.')
    
    # Generate sample texts for comparison
    sample_texts = [
        "This is a sample academic text about machine learning and artificial intelligence.",
        "Research shows that machine learning algorithms can improve accuracy over time.",
        "The field of artificial intelligence has seen rapid development in recent years.",
        "Data science combines statistics, mathematics, and computer science.",
        "Neural networks are inspired by the structure of the human brain."
    ]
    
    similarities = []
    for sample in sample_texts:
        matcher = SequenceMatcher(None, content, sample)
        similarities.append(matcher.ratio() * 100)
    
    return max(similarities) if similarities else random.randint(10, 30)

def generate_text_sources(content):
    """Generate mock sources for text plagiarism"""
    sources = [
        {'name': 'Academic Journal', 'url': 'www.researchgate.net', 'percentage': random.randint(15, 45)},
        {'name': 'Wikipedia Article', 'url': 'en.wikipedia.org', 'percentage': random.randint(10, 35)},
        {'name': 'Educational Website', 'url': 'www.coursera.org', 'percentage': random.randint(5, 25)},
        {'name': 'Blog Post', 'url': 'medium.com', 'percentage': random.randint(8, 20)},
        {'name': 'Research Paper', 'url': 'www.ieee.org', 'percentage': random.randint(12, 30)}
    ]
    
    return sorted(sources, key=lambda x: x['percentage'], reverse=True)

def detect_language(content):
    """Detect programming language from content"""
    language_indicators = {
        'python': ['def ', 'import ', 'print(', 'if __name__', '# '],
        'java': ['public class', 'public static void', 'System.out.println', 'import java.'],
        'javascript': ['function ', 'var ', 'const ', 'console.log', 'document.getElementById'],
        'cpp': ['#include', 'using namespace', 'cout <<', 'int main()', 'std::'],
        'c': ['#include', 'printf(', 'int main()', 'return 0;', 'stdio.h'],
        'html': ['<!DOCTYPE', '<html', '<head>', '<body>', '</html>', '<div'],
        'css': ['{', '}', 'margin:', 'padding:', 'display:', 'color:'],
        'sql': ['SELECT', 'FROM', 'WHERE', 'INSERT INTO', 'CREATE TABLE']
    }
    
    scores = {}
    content_lower = content.lower()
    
    for lang, indicators in language_indicators.items():
        score = sum(1 for indicator in indicators if indicator in content_lower)
        scores[lang] = score
    
    return max(scores, key=scores.get) if scores else 'unknown'