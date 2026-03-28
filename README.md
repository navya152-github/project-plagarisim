# Plagiarism Detection System

A modern and professional web-based plagiarism detection system built with HTML, CSS, JavaScript, and Bootstrap.

## Features

- **User Authentication**: Login and registration system with modern glassmorphism design
- **Text Input Detection**: Enter text manually for plagiarism analysis
- **File Upload Detection**: Upload PDF, DOC, DOCX, and TXT files with drag-and-drop support
- **Visual Results**: Interactive plagiarism percentage display with progress bars and highlighting
- **History Tracking**: View previous detection results in a organized table
- **Detailed Reports**: Comprehensive plagiarism reports with download functionality
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Glassmorphism effects, gradient backgrounds, and smooth animations

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with glassmorphism and gradients
- **JavaScript (ES6+):** Interactive functionality and state management
- **Bootstrap 5**: Responsive grid system and components
- **Font Awesome**: Professional icons throughout the application

## Pages Included

1. **Login Page**: Secure user authentication with gradient background
2. **Register Page**: User registration with modern form validation
3. **Dashboard Page**: Main navigation hub with quick access to all features
4. **Text Input Page**: Manual text entry for plagiarism detection
5. **File Upload Page**: Drag-and-drop file upload interface
6. **Result Page**: Visual plagiarism percentage display and analysis
7. **History Page**: Table view of previous detection results
8. **Report Page**: Detailed plagiarism reports with download options

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Open `index.html` in your web browser

### Running with a Local Server

For the best experience, run the project with a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Choose Detection Method**: 
   - Click "Detect from Text" to enter text manually
   - Click "Detect from File" to upload a document
3. **View Results**: See plagiarism percentage and detailed analysis
4. **Check History**: Access previous detection results from the history page
5. **Download Reports**: Generate and download detailed plagiarism reports

## Design Features

- **Glassmorphism**: Modern frosted glass effect on all cards and components
- **Gradient Backgrounds**: Beautiful blue-purple gradient throughout the application
- **Smooth Animations**: Hover effects, transitions, and loading animations
- **Responsive Layout**: Adapts seamlessly to desktop, tablet, and mobile screens
- **Professional Color Scheme**: Blue and purple gradients with gold accents
- **Interactive Elements**: All buttons, cards, and navigation items are fully interactive

## File Structure

```
plagiarism-detection-system/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Notes

- This is a frontend-only demonstration project
- Plagiarism detection results are simulated for demonstration purposes
- File upload functionality is limited to frontend display only
- Data is stored locally in the browser's localStorage for history tracking

## Future Enhancements

- Backend integration with real plagiarism detection APIs
- Database integration for persistent user data
- Advanced text analysis algorithms
- Multi-language support
- Export to different formats (PDF, Word, Excel)
- Real-time collaboration features
- Advanced reporting with source attribution

## License

This project is open source and available under the MIT License.
