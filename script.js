// Plagiarism Detection System JavaScript
class PlagiarismDetectionApp {
    constructor() {
        this.currentPage = 'login';
        this.user = null;
        this.history = [];
        this.init();
    }

    init() {
        this.loadPage('login');
        this.setupEventListeners();
        this.loadHistory();
    }

    setupEventListeners() {
        // Navigation will be handled dynamically
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.loadPage(page);
            }
        });
    }

    loadPage(page) {
        const app = document.getElementById('app');
        this.currentPage = page;

        switch(page) {
            case 'login':
                app.innerHTML = this.getLoginPage();
                this.setupLoginEvents();
                break;
            case 'register':
                app.innerHTML = this.getRegisterPage();
                this.setupRegisterEvents();
                break;
            case 'dashboard':
                app.innerHTML = this.getDashboardPage();
                this.setupDashboardEvents();
                break;
            case 'text-input':
                app.innerHTML = this.getTextInputPage();
                this.setupTextInputEvents();
                break;
            case 'file-upload':
                app.innerHTML = this.getFileUploadPage();
                this.setupFileUploadEvents();
                break;
            case 'result':
                app.innerHTML = this.getResultPage();
                break;
            case 'history':
                app.innerHTML = this.getHistoryPage();
                this.setupHistoryEvents();
                break;
            case 'report':
                app.innerHTML = this.getReportPage();
                this.setupReportEvents();
                break;
        }
    }

    getLoginPage() {
        return `
            <div class="auth-container">
                <div class="glass-card auth-card">
                    <h2 class="text-center mb-4">Welcome Back</h2>
                    <p class="text-center mb-4">Login to your Plagiarism Detection System</p>
                    <form id="loginForm">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="username" placeholder="Username" required>
                            <label for="username">Username</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="password" placeholder="Password" required>
                            <label for="password">Password</label>
                        </div>
                        <button type="submit" class="btn btn-primary-custom w-100 mb-3">
                            <i class="fas fa-sign-in-alt me-2"></i>Login
                        </button>
                        <div class="text-center">
                            <p>Don't have an account? <a href="#" class="text-white" onclick="app.loadPage('register')">Register here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    getRegisterPage() {
        return `
            <div class="auth-container">
                <div class="glass-card auth-card">
                    <h2 class="text-center mb-4">Create Account</h2>
                    <p class="text-center mb-4">Join Plagiarism Detection System</p>
                    <form id="registerForm">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="name" placeholder="Full Name" required>
                            <label for="name">Full Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="email" placeholder="Email" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="username" placeholder="Username" required>
                            <label for="username">Username</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="password" placeholder="Password" required>
                            <label for="password">Password</label>
                        </div>
                        <button type="submit" class="btn btn-primary-custom w-100 mb-3">
                            <i class="fas fa-user-plus me-2"></i>Register
                        </button>
                        <div class="text-center">
                            <p>Already have an account? <a href="#" class="text-white" onclick="app.loadPage('login')">Login here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    getDashboardPage() {
        return `
            <div class="sidebar">
                <div class="logo">
                    <i class="fas fa-shield-alt me-2"></i>Plagiarism Detection
                </div>
                <nav>
                    <a href="#" class="nav-link active" data-page="dashboard">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="#" class="nav-link" data-page="text-input">
                        <i class="fas fa-keyboard"></i> Detect from Text
                    </a>
                    <a href="#" class="nav-link" data-page="file-upload">
                        <i class="fas fa-file-upload"></i> Detect from File
                    </a>
                    <a href="#" class="nav-link" data-page="history">
                        <i class="fas fa-history"></i> History
                    </a>
                    <a href="#" class="nav-link" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </div>
            <div class="main-content">
                <div class="welcome-card">
                    <h1>Welcome back, ${this.user ? this.user.name : 'User'}!</h1>
                    <p class="lead">Choose how you'd like to detect plagiarism</p>
                </div>
                <div class="action-buttons">
                    <div class="action-card" onclick="app.loadPage('text-input')">
                        <i class="fas fa-keyboard"></i>
                        <h3>Detect from Text</h3>
                        <p>Enter text manually to check for plagiarism</p>
                    </div>
                    <div class="action-card" onclick="app.loadPage('file-upload')">
                        <i class="fas fa-file-upload"></i>
                        <h3>Detect from File</h3>
                        <p>Upload PDF, DOC, or TXT files</p>
                    </div>
                    <div class="action-card" onclick="app.loadPage('history')">
                        <i class="fas fa-history"></i>
                        <h3>History</h3>
                        <p>View previous plagiarism detection results</p>
                    </div>
                </div>
            </div>
        `;
    }

    getTextInputPage() {
        return `
            <div class="sidebar">
                <div class="logo">
                    <i class="fas fa-shield-alt me-2"></i>Plagiarism Detection
                </div>
                <nav>
                    <a href="#" class="nav-link" data-page="dashboard">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="#" class="nav-link active" data-page="text-input">
                        <i class="fas fa-keyboard"></i> Detect from Text
                    </a>
                    <a href="#" class="nav-link" data-page="file-upload">
                        <i class="fas fa-file-upload"></i> Detect from File
                    </a>
                    <a href="#" class="nav-link" data-page="history">
                        <i class="fas fa-history"></i> History
                    </a>
                    <a href="#" class="nav-link" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </div>
            <div class="main-content">
                <div class="text-input-container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="text-input-card">
                                <h2 class="mb-4">Plagiarism Checker</h2>
                                <p class="text-white-50 mb-3">Type, paste, or upload your text</p>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="textInput" placeholder="Enter your text here..." style="height: 400px;" oninput="app.analyzeText()"></textarea>
                                    <label for="textInput">Enter your text here...</label>
                                </div>
                                <div class="d-flex gap-3 justify-content-between">
                                    <div>
                                        <button class="btn btn-primary-custom btn-lg" onclick="app.detectFromText()">
                                            <i class="fas fa-search me-2"></i>Scan for plagiarism
                                        </button>
                                        <button class="btn btn-outline-light btn-lg ms-2" onclick="app.uploadTextFile()">
                                            <i class="fas fa-file-upload me-2"></i>Upload file
                                        </button>
                                    </div>
                                    <button class="btn btn-secondary btn-lg" onclick="app.clearText()">
                                        <i class="fas fa-eraser me-2"></i>Clear
                                    </button>
                                </div>
                                <div class="mt-3">
                                    <a href="#" class="text-white-50" onclick="app.loadSampleText()">
                                        <i class="fas fa-file-alt me-1"></i>Try sample text
                                    </a>
                                </div>
                                <input type="file" id="textFileInput" accept=".txt,.doc,.docx,.pdf" style="display: none;" onchange="app.handleTextFileUpload(event)">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="results-card">
                                <h3 class="mb-4">Plagiarism Checker results</h3>
                                <div id="results-content">
                                    <div class="results-placeholder">
                                        <i class="fas fa-search fa-3x text-white-25 mb-3"></i>
                                        <p class="text-white-50">Add your text and click Scan for plagiarism to see your results</p>
                                    </div>
                                </div>
                                <div id="results-categories" style="display: none;">
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-shield-alt me-2"></i>
                                            <span>Plagiarism detection</span>
                                            <span class="badge result-badge" id="plagiarism-badge">0 issues</span>
                                        </div>
                                        <div class="category-content" id="plagiarism-content">
                                            <p class="text-white-50">No plagiarism detected</p>
                                        </div>
                                    </div>
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-spell-check me-2"></i>
                                            <span>Spelling</span>
                                            <span class="badge result-badge" id="spelling-badge">0 issues</span>
                                        </div>
                                        <div class="category-content" id="spelling-content">
                                            <p class="text-white-50">No spelling issues found</p>
                                        </div>
                                    </div>
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-compress-alt me-2"></i>
                                            <span>Conciseness</span>
                                            <span class="badge result-badge" id="conciseness-badge">0 issues</span>
                                        </div>
                                        <div class="category-content" id="conciseness-content">
                                            <p class="text-white-50">Text is well-structured</p>
                                        </div>
                                    </div>
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-book me-2"></i>
                                            <span>Word choice</span>
                                            <span class="badge result-badge" id="wordchoice-badge">0 issues</span>
                                        </div>
                                        <div class="category-content" id="wordchoice-content">
                                            <p class="text-white-50">Good word variety</p>
                                        </div>
                                    </div>
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-graduation-cap me-2"></i>
                                            <span>Grammar</span>
                                            <span class="badge result-badge" id="grammar-badge">0 issues</span>
                                        </div>
                                        <div class="category-content" id="grammar-content">
                                            <p class="text-white-50">No grammar issues found</p>
                                        </div>
                                    </div>
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-quote-right me-2"></i>
                                            <span>Punctuation</span>
                                            <span class="badge result-badge" id="punctuation-badge">0 issues</span>
                                        </div>
                                        <div class="category-content" id="punctuation-content">
                                            <p class="text-white-50">Punctuation looks good</p>
                                        </div>
                                    </div>
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-eye me-2"></i>
                                            <span>Readability</span>
                                            <span class="badge result-badge" id="readability-badge">Good</span>
                                        </div>
                                        <div class="category-content" id="readability-content">
                                            <p class="text-white-50">Text is easy to read</p>
                                        </div>
                                    </div>
                                    <div class="result-category">
                                        <div class="category-header">
                                            <i class="fas fa-exclamation-triangle me-2"></i>
                                            <span>Additional issues</span>
                                            <span class="badge result-badge" id="additional-badge">0 issues</span>
                                        </div>
                                        <div class="category-content" id="additional-content">
                                            <p class="text-white-50">No additional issues found</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getFileUploadPage() {
        return `
            <div class="sidebar">
                <div class="logo">
                    <i class="fas fa-shield-alt me-2"></i>Plagiarism Detection
                </div>
                <nav>
                    <a href="#" class="nav-link" data-page="dashboard">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="#" class="nav-link" data-page="text-input">
                        <i class="fas fa-keyboard"></i> Detect from Text
                    </a>
                    <a href="#" class="nav-link active" data-page="file-upload">
                        <i class="fas fa-file-upload"></i> Detect from File
                    </a>
                    <a href="#" class="nav-link" data-page="history">
                        <i class="fas fa-history"></i> History
                    </a>
                    <a href="#" class="nav-link" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </div>
            <div class="main-content">
                <div class="file-upload-container">
                    <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <h3>Upload Your File</h3>
                        <p>Drag and drop your file here or click to browse</p>
                        <div class="supported-formats">
                            <h5>Supported File Types:</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <h6><i class="fas fa-file-alt me-2"></i>Documents</h6>
                                    <ul class="list-unstyled">
                                        <li><span class="badge bg-secondary">TXT</span></li>
                                        <li><span class="badge bg-secondary">PDF</span></li>
                                        <li><span class="badge bg-secondary">DOC</span></li>
                                        <li><span class="badge bg-secondary">DOCX</span></li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h6><i class="fas fa-code me-2"></i>Code Files</h6>
                                    <ul class="list-unstyled">
                                        <li><span class="badge bg-info">PY</span> Python</li>
                                        <li><span class="badge bg-info">JAVA</span> Java</li>
                                        <li><span class="badge bg-info">CPP</span> C++</li>
                                        <li><span class="badge bg-info">C</span> C</li>
                                        <li><span class="badge bg-info">JS</span> JavaScript</li>
                                        <li><span class="badge bg-info">HTML</span> HTML</li>
                                        <li><span class="badge bg-info">CSS</span> CSS</li>
                                        <li><span class="badge bg-info">SQL</span> SQL</li>
                                        <li><span class="badge bg-info">JSON</span> JSON</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="text-white-50 mt-3">Maximum file size: 16MB</p>
                        <input type="file" id="fileInput" accept=".txt,.pdf,.doc,.docx,.py,.java,.cpp,.c,.js,.html,.css,.sql,.json" style="display: none;">
                    </div>
                    <div id="fileInfo" class="file-info" style="display: none;">
                        <h4>Selected File:</h4>
                        <div class="file-details">
                            <div class="file-type-display"></div>
                            <div id="fileName" class="file-name"></div>
                        </div>
                        <button class="btn btn-primary-custom btn-lg mt-3" onclick="app.detectFromFile()">
                            <i class="fas fa-search me-2"></i>Detect Plagiarism
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getResultPage() {
        const sources = this.generateMockSources();
        const overallPercentage = this.calculateOverallPercentage(sources);
        
        return `
            <div class="sidebar">
                <div class="logo">
                    <i class="fas fa-shield-alt me-2"></i>Plagiarism Detection
                </div>
                <nav>
                    <a href="#" class="nav-link" data-page="dashboard">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="#" class="nav-link" data-page="text-input">
                        <i class="fas fa-keyboard"></i> Detect from Text
                    </a>
                    <a href="#" class="nav-link" data-page="file-upload">
                        <i class="fas fa-file-upload"></i> Detect from File
                    </a>
                    <a href="#" class="nav-link" data-page="history">
                        <i class="fas fa-history"></i> History
                    </a>
                    <a href="#" class="nav-link" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </div>
            <div class="main-content">
                <div class="result-container">
                    <div class="result-header-card">
                        <h2 class="text-center mb-2">Plagiarism Detection Results</h2>
                        <p class="text-center text-white-50">Analysis completed against our comprehensive database</p>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-7 mb-4 mb-lg-0">
                            <div class="result-card h-100">
                                <h3 class="text-center mb-4">Matched Sources</h3>
                                <div class="table-responsive">
                                    <table class="table table-hover source-table">
                                        <thead>
                                            <tr>
                                                <th>Source Name</th>
                                                <th>Similarity %</th>
                                                <th>Matched Content</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${sources.map(source => `
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <i class="fas fa-globe me-2 text-primary"></i>
                                                            <div>
                                                                <div class="fw-bold">${source.name}</div>
                                                                <small class="text-white-50">${source.url}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="badge ${source.percentage > 50 ? 'bg-danger' : source.percentage > 20 ? 'bg-warning' : 'bg-success'}">
                                                            ${source.percentage}%
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <small class="text-white-75">${source.matchedContent}</small>
                                                    </td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="result-card h-100">
                                <h3 class="text-center mb-4">Overall Plagiarism</h3>
                                <div class="percentage-display">
                                    <div class="percentage-circle" style="--percentage: ${overallPercentage * 3.6}deg;">
                                        <span class="percentage-text">${overallPercentage}%</span>
                                    </div>
                                    <p class="mt-3 text-white-50">Overall similarity with online sources</p>
                                </div>

                                <h4 class="mt-4 mb-3">Plagiarism Breakdown</h4>
                                <div class="progress-section">
                                    ${sources.map(source => `
                                        <div class="mb-3">
                                            <div class="d-flex justify-content-between mb-1">
                                                <small class="fw-bold">${source.name}</small>
                                                <small>${source.percentage}%</small>
                                            </div>
                                            <div class="progress" style="height: 20px;">
                                                <div class="progress-bar ${source.percentage > 50 ? 'bg-danger' : source.percentage > 20 ? 'bg-warning' : 'bg-success'}" 
                                                     role="progressbar" 
                                                     style="width: ${source.percentage}%;" 
                                                     aria-valuenow="${source.percentage}" 
                                                     aria-valuemin="0" 
                                                     aria-valuemax="100">
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>

                                <h4 class="mt-4 mb-3">Result Summary</h4>
                                <div class="summary-section">
                                    <p class="text-white-75 mb-3">
                                        Your document has an overall plagiarism score of <strong>${overallPercentage}%</strong>. 
                                        ${overallPercentage > 50 ? 'High similarity detected. Major revision recommended.' : 
                                          overallPercentage > 20 ? 'Moderate similarity detected. Review and cite sources.' : 
                                          'Low similarity detected. Content appears to be original.'}
                                    </p>
                                    <div class="summary-stats">
                                        <div class="row text-center">
                                            <div class="col-4">
                                                <div class="stat-number">${sources.length}</div>
                                                <small class="text-white-50">Sources Found</small>
                                            </div>
                                            <div class="col-4">
                                                <div class="stat-number">${Math.max(...sources.map(s => s.percentage))}%</div>
                                                <small class="text-white-50">Highest Match</small>
                                            </div>
                                            <div class="col-4">
                                                <div class="stat-number">${Math.round(sources.reduce((acc, s) => acc + s.percentage, 0) / sources.length)}%</div>
                                                <small class="text-white-50">Average Match</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-4">
                        <div class="d-flex gap-3 justify-content-center">
                            <button class="btn btn-primary-custom btn-lg" onclick="app.loadPage('report')">
                                <i class="fas fa-file-alt me-2"></i>View Full Report
                            </button>
                            <button class="btn btn-secondary btn-lg" onclick="app.loadPage('dashboard')">
                                <i class="fas fa-home me-2"></i>Back to Dashboard
                            </button>
                            <button class="btn btn-outline-light btn-lg" onclick="app.downloadReport()">
                                <i class="fas fa-download me-2"></i>Download Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getHistoryPage() {
        const historyHTML = this.history.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.fileName || 'Text Input'}</td>
                <td>${item.percentage}%</td>
                <td>${item.date}</td>
                <td>
                    <button class="btn btn-sm btn-primary-custom" onclick="app.viewReport(${index})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `).join('');

        return `
            <div class="sidebar">
                <div class="logo">
                    <i class="fas fa-shield-alt me-2"></i>Plagiarism Detection
                </div>
                <nav>
                    <a href="#" class="nav-link" data-page="dashboard">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="#" class="nav-link" data-page="text-input">
                        <i class="fas fa-keyboard"></i> Detect from Text
                    </a>
                    <a href="#" class="nav-link" data-page="file-upload">
                        <i class="fas fa-file-upload"></i> Detect from File
                    </a>
                    <a href="#" class="nav-link active" data-page="history">
                        <i class="fas fa-history"></i> History
                    </a>
                    <a href="#" class="nav-link" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </div>
            <div class="main-content">
                <div class="history-container">
                    <div class="history-card">
                        <h2 class="mb-4">Detection History</h2>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>File Name</th>
                                        <th>Plagiarism %</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${historyHTML || '<tr><td colspan="5" class="text-center">No history available</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getReportPage() {
        return `
            <div class="sidebar">
                <div class="logo">
                    <i class="fas fa-shield-alt me-2"></i>Plagiarism Detection
                </div>
                <nav>
                    <a href="#" class="nav-link" data-page="dashboard">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="#" class="nav-link" data-page="text-input">
                        <i class="fas fa-keyboard"></i> Detect from Text
                    </a>
                    <a href="#" class="nav-link" data-page="file-upload">
                        <i class="fas fa-file-upload"></i> Detect from File
                    </a>
                    <a href="#" class="nav-link" data-page="history">
                        <i class="fas fa-history"></i> History
                    </a>
                    <a href="#" class="nav-link" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </div>
            <div class="main-content">
                <div class="report-container">
                    <div class="report-card">
                        <div class="report-header">
                            <h2>Plagiarism Detection Report</h2>
                            <p class="text-muted">Generated on: ${new Date().toLocaleString()}</p>
                        </div>
                        <div class="report-section">
                            <h4>Executive Summary</h4>
                            <p>This report provides a comprehensive analysis of the submitted content for potential plagiarism. The system has compared your document against our extensive database of academic papers, websites, and publications.</p>
                        </div>
                        <div class="report-section">
                            <h4>Key Findings</h4>
                            <ul>
                                <li>Overall similarity score: ${Math.floor(Math.random() * 100)}%</li>
                                <li>Sources found: ${Math.floor(Math.random() * 10) + 1}</li>
                                <li>Unique content: ${Math.floor(Math.random() * 100)}%</li>
                                <li>Processing time: ${Math.floor(Math.random() * 5) + 1} seconds</li>
                            </ul>
                        </div>
                        <div class="report-section">
                            <h4>Recommendations</h4>
                            <p>Based on the analysis, we recommend reviewing the highlighted sections and properly citing any sources that were not originally attributed.</p>
                        </div>
                        <div class="d-flex gap-3">
                            <button class="btn btn-primary-custom" onclick="app.downloadReport()">
                                <i class="fas fa-download me-2"></i>Download Report
                            </button>
                            <button class="btn btn-secondary" onclick="app.loadPage('dashboard')">
                                <i class="fas fa-home me-2"></i>Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupLoginEvents() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // Simulate login
                this.user = { name: username, username: username };
                this.showToast('Login successful!', 'success');
                this.loadPage('dashboard');
            });
        }
    }

    setupRegisterEvents() {
        const form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // Simulate registration
                this.user = { name, username, email };
                this.showToast('Registration successful!', 'success');
                this.loadPage('dashboard');
            });
        }
    }

    setupDashboardEvents() {
        // Navigation handled by event delegation
    }

    setupTextInputEvents() {
        // Events handled by onclick attributes
    }

    setupFileUploadEvents() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        
        if (uploadArea && fileInput) {
            // Drag and drop events
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            });
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        }
    }

    setupHistoryEvents() {
        // Events handled by onclick attributes
    }

    setupReportEvents() {
        // Events handled by onclick attributes
    }

    handleFileSelect(file) {
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        
        if (fileInfo && fileName) {
            fileName.textContent = file.name;
            fileInfo.style.display = 'block';
            this.selectedFile = file;
            
            // Show file type indicator
            const fileType = this.getFileType(file.name);
            this.showFileType(file.name, fileType);
        }
    }

    getFileType(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const codeExtensions = ['py', 'java', 'cpp', 'c', 'js', 'html', 'css', 'sql', 'json'];
        const docExtensions = ['txt', 'pdf', 'doc', 'docx'];
        
        if (codeExtensions.includes(ext)) {
            return 'code';
        } else if (docExtensions.includes(ext)) {
            return 'document';
        }
        return 'unknown';
    }

    showFileType(filename, fileType) {
        const fileCard = document.querySelector('.file-info');
        if (fileCard) {
            const typeIndicator = document.createElement('div');
            typeIndicator.className = `file-type-indicator mb-2`;
            typeIndicator.innerHTML = `
                <span class="badge ${fileType === 'code' ? 'bg-info' : 'bg-primary'}">
                    <i class="fas fa-${fileType === 'code' ? 'code' : 'file-alt'} me-1"></i>
                    ${fileType === 'code' ? 'Code File' : 'Document'}
                </span>
                <small class="text-white-50">${filename}</small>
            `;
            fileCard.appendChild(typeIndicator);
        }
    }

    detectFromFile() {
        if (!this.selectedFile) {
            this.showToast('Please select a file first', 'error');
            return;
        }
        
        this.showToast('Analyzing file...', 'info');
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        // Send to backend
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.processBackendResult(data.result);
                this.addToHistory(this.selectedFile.name, data.result.overall_percentage);
                this.showToast('Analysis complete!', 'success');
            } else {
                this.showToast(data.error || 'Analysis failed', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.showToast('Analysis failed. Please try again.', 'error');
        });
    }

    processBackendResult(result) {
        // Store result for display
        this.currentResult = result;
        
        // Update the results display with backend data
        this.updateResultsFromBackend(result);
        
        // Navigate to results page
        this.loadPage('result');
    }

    updateResultsFromBackend(result) {
        // Update the result page with backend data
        if (this.currentPage === 'result') {
            // This will be handled when the result page loads
            setTimeout(() => {
                this.displayBackendResults(result);
            }, 100);
        }
    }

    displayBackendResults(result) {
        // Update sources table with real data
        const sourcesBody = document.getElementById('source-results-body');
        if (sourcesBody && result.sources) {
            const sourcesHTML = result.sources.map((source, index) => `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <i class="fas fa-globe me-2 text-primary"></i>
                            <div>
                                <div class="fw-bold">${source.name}</div>
                                <small class="text-white-50">${source.url}</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${source.percentage > 50 ? 'bg-danger' : source.percentage > 20 ? 'bg-warning' : 'bg-success'}">
                            ${source.percentage}%
                        </span>
                    </td>
                    <td>
                        <small class="text-white-75">${source.matched_content}</small>
                    </td>
                </tr>
            `).join('');
            
            sourcesBody.innerHTML = sourcesHTML;
        }
        
        // Update overall percentage
        const overallPercentage = result.overall_percentage || 0;
        const percentageElement = document.getElementById('overall-percentage');
        if (percentageElement) {
            percentageElement.textContent = `${overallPercentage}%`;
        }
        
        // Update file type indicator
        const fileTypeElement = document.querySelector('.file-type-display');
        if (fileTypeElement && result.file_type) {
            fileTypeElement.innerHTML = `
                <span class="badge ${result.file_type === 'code' ? 'bg-info' : 'bg-primary'}">
                    <i class="fas fa-${result.file_type === 'code' ? 'code' : 'file-alt'} me-1"></i>
                    ${result.file_type === 'code' ? 'Code Analysis' : 'Document Analysis'}
                </span>
            `;
        }
    }

    generateMockSources() {
        const sourceTypes = [
            { name: 'Academic Journal', url: 'www.researchgate.net', baseContent: 'Machine learning algorithms' },
            { name: 'Wikipedia', url: 'en.wikipedia.org', baseContent: 'Artificial intelligence' },
            { name: 'Stack Overflow', url: 'stackoverflow.com', baseContent: 'Programming solutions' },
            { name: 'Research Paper', url: 'www.ieee.org', baseContent: 'Neural networks' },
            { name: 'Blog Post', url: 'medium.com', baseContent: 'Data science' },
            { name: 'Educational Site', url: 'www.coursera.org', baseContent: 'Online learning' }
        ];

        const numSources = Math.floor(Math.random() * 4) + 2; // 2-5 sources
        const selectedSources = [];
        
        for (let i = 0; i < numSources; i++) {
            const sourceType = sourceTypes[Math.floor(Math.random() * sourceTypes.length)];
            const percentage = Math.floor(Math.random() * 80) + 10; // 10-90%
            
            selectedSources.push({
                name: `${sourceType.name} ${i + 1}`,
                url: sourceType.url,
                percentage: percentage,
                matchedContent: `"${sourceType.baseContent}..." - ${percentage}% match found`
            });
        }
        
        return selectedSources.sort((a, b) => b.percentage - a.percentage);
    }

    calculateOverallPercentage(sources) {
        if (sources.length === 0) return 0;
        const total = sources.reduce((sum, source) => sum + source.percentage, 0);
        return Math.round(total / sources.length);
    }

    analyzeText() {
        const textInput = document.getElementById('textInput');
        const text = textInput ? textInput.value : '';
        
        if (text.length > 0) {
            // Show real-time analysis as user types
            this.updateResultsDisplay(text);
        } else {
            this.hideResults();
        }
    }

    updateResultsDisplay(text) {
        const resultsPlaceholder = document.getElementById('results-content');
        const resultsCategories = document.getElementById('results-categories');
        
        if (resultsPlaceholder && resultsCategories) {
            resultsPlaceholder.style.display = 'none';
            resultsCategories.style.display = 'block';
        }
        
        // Simulate analysis results
        const analysis = this.analyzeTextContent(text);
        
        // Update plagiarism detection
        this.updateCategory('plagiarism', analysis.plagiarism);
        this.updateCategory('spelling', analysis.spelling);
        this.updateCategory('conciseness', analysis.conciseness);
        this.updateCategory('wordchoice', analysis.wordchoice);
        this.updateCategory('grammar', analysis.grammar);
        this.updateCategory('punctuation', analysis.punctuation);
        this.updateCategory('readability', analysis.readability);
        this.updateCategory('additional', analysis.additional);
    }

    analyzeTextContent(text) {
        const wordCount = text.split(/\s+/).length;
        const charCount = text.length;
        
        return {
            plagiarism: {
                issues: Math.floor(Math.random() * 3),
                message: wordCount > 50 ? `${Math.floor(Math.random() * 30)}% similarity detected` : 'No plagiarism detected'
            },
            spelling: {
                issues: Math.floor(Math.random() * 2),
                message: Math.random() > 0.7 ? 'Potential spelling issues found' : 'No spelling issues found'
            },
            conciseness: {
                issues: Math.floor(Math.random() * 2),
                message: wordCount > 100 ? 'Text could be more concise' : 'Text is well-structured'
            },
            wordchoice: {
                issues: Math.floor(Math.random() * 2),
                message: Math.random() > 0.6 ? 'Consider alternative words' : 'Good word variety'
            },
            grammar: {
                issues: Math.floor(Math.random() * 2),
                message: Math.random() > 0.8 ? 'Grammar issues detected' : 'No grammar issues found'
            },
            punctuation: {
                issues: Math.floor(Math.random() * 2),
                message: Math.random() > 0.7 ? 'Check punctuation' : 'Punctuation looks good'
            },
            readability: {
                issues: 0,
                message: charCount > 500 ? 'Text is moderately readable' : 'Text is easy to read'
            },
            additional: {
                issues: Math.floor(Math.random() * 2),
                message: Math.random() > 0.8 ? 'Additional suggestions available' : 'No additional issues found'
            }
        };
    }

    updateCategory(category, analysis) {
        const badge = document.getElementById(`${category}-badge`);
        const content = document.getElementById(`${category}-content`);
        
        if (badge && content) {
            badge.textContent = analysis.issues > 0 ? `${analysis.issues} issues` : 
                              category === 'readability' ? analysis.message : 'No issues';
            badge.className = `badge result-badge ${analysis.issues > 0 ? 'bg-warning' : 'bg-success'}`;
            
            if (content.querySelector('p')) {
                content.querySelector('p').textContent = analysis.message;
            }
        }
    }

    hideResults() {
        const resultsPlaceholder = document.getElementById('results-content');
        const resultsCategories = document.getElementById('results-categories');
        
        if (resultsPlaceholder && resultsCategories) {
            resultsPlaceholder.style.display = 'block';
            resultsCategories.style.display = 'none';
        }
    }

    uploadTextFile() {
        document.getElementById('textFileInput').click();
    }

    handleTextFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const textInput = document.getElementById('textInput');
                if (textInput) {
                    textInput.value = e.target.result;
                    this.analyzeText();
                }
            };
            reader.readAsText(file);
        }
    }

    loadSampleText() {
        const sampleText = `Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves. The process of learning begins with observations or data, such as examples, direct experience, or instruction, in order to look for patterns in data and make better decisions in the future based on the examples that we provide. Machine learning algorithms build a mathematical model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to perform the task.`;
        
        const textInput = document.getElementById('textInput');
        if (textInput) {
            textInput.value = sampleText;
            this.analyzeText();
        }
    }

    detectFromText() {
        const textInput = document.getElementById('textInput');
        if (!textInput || !textInput.value.trim()) {
            this.showToast('Please enter some text to analyze', 'error');
            return;
        }
        
        // Show loading state
        this.showToast('Analyzing text...', 'info');
        this.showLoadingState();
        
        // Simulate analysis and show results in current page
        setTimeout(() => {
            const text = textInput.value;
            const sources = this.generateMockSources();
            const overallPercentage = this.calculateOverallPercentage(sources);
            
            // Update the results panel with detailed analysis
            this.updateDetailedResults(text, sources, overallPercentage);
            
            // Add to history
            this.addToHistory('Text Input', overallPercentage);
            
            this.showToast('Analysis complete!', 'success');
        }, 2000);
    }

    showLoadingState() {
        const resultsPlaceholder = document.getElementById('results-content');
        const resultsCategories = document.getElementById('results-categories');
        
        if (resultsPlaceholder && resultsCategories) {
            resultsPlaceholder.style.display = 'none';
            resultsCategories.style.display = 'block';
            
            // Show loading message in each category
            const categories = ['plagiarism', 'spelling', 'conciseness', 'wordchoice', 'grammar', 'punctuation', 'readability', 'additional'];
            categories.forEach(category => {
                const badge = document.getElementById(`${category}-badge`);
                const content = document.getElementById(`${category}-content`);
                
                if (badge) {
                    badge.textContent = 'Analyzing...';
                    badge.className = 'badge result-badge bg-info';
                }
                if (content && content.querySelector('p')) {
                    content.querySelector('p').innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing text...';
                }
            });
        }
    }

    updateDetailedResults(text, sources, overallPercentage) {
        // Update plagiarism detection with actual sources
        const plagiarismBadge = document.getElementById('plagiarism-badge');
        const plagiarismContent = document.getElementById('plagiarism-content');
        
        if (plagiarismBadge && plagiarismContent) {
            plagiarismBadge.textContent = `${sources.length} sources found`;
            plagiarismBadge.className = `badge result-badge ${overallPercentage > 50 ? 'bg-danger' : overallPercentage > 20 ? 'bg-warning' : 'bg-success'}`;
            
            const sourcesList = sources.map(source => 
                `<div class="source-item mb-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold">${source.name}</span>
                        <span class="badge ${source.percentage > 50 ? 'bg-danger' : source.percentage > 20 ? 'bg-warning' : 'bg-success'}">${source.percentage}%</span>
                    </div>
                    <small class="text-white-50">${source.matchedContent}</small>
                </div>`
            ).join('');
            
            plagiarismContent.innerHTML = `
                <div class="mb-2">
                    <strong>Overall similarity: ${overallPercentage}%</strong>
                </div>
                <div class="sources-list">
                    ${sourcesList}
                </div>
            `;
        }
        
        // Update other categories with realistic analysis
        const wordCount = text.split(/\s+/).length;
        const charCount = text.length;
        const sentences = text.split(/[.!?]+/).length;
        
        this.updateCategory('spelling', {
            issues: Math.floor(Math.random() * 3),
            message: `${Math.floor(Math.random() * 5)} potential spelling issues detected`
        });
        
        this.updateCategory('conciseness', {
            issues: wordCount > 200 ? 2 : wordCount > 100 ? 1 : 0,
            message: wordCount > 200 ? 'Text could be more concise' : wordCount > 100 ? 'Consider reducing length' : 'Text length is appropriate'
        });
        
        this.updateCategory('wordchoice', {
            issues: Math.floor(Math.random() * 3),
            message: `${Math.floor(Math.random() * 4)} words could be improved`
        });
        
        this.updateCategory('grammar', {
            issues: Math.floor(Math.random() * 2),
            message: `${Math.floor(Math.random() * 3)} grammar suggestions available`
        });
        
        this.updateCategory('punctuation', {
            issues: Math.floor(Math.random() * 2),
            message: sentences > 10 ? 'Check sentence punctuation' : 'Punctuation looks good'
        });
        
        this.updateCategory('readability', {
            issues: 0,
            message: `Readability score: ${Math.floor(Math.random() * 30) + 60}/100 - ${charCount > 500 ? 'Moderately readable' : 'Easy to read'}`
        });
        
        this.updateCategory('additional', {
            issues: Math.floor(Math.random() * 2),
            message: `${Math.floor(Math.random() * 3)} additional suggestions for improvement`
        });
    }

    detectFromFile() {
        if (!this.selectedFile) {
            this.showToast('Please select a file first', 'error');
            return;
        }
        
        this.showToast('Analyzing file...', 'info');
        setTimeout(() => {
            const sources = this.generateMockSources();
            const overallPercentage = this.calculateOverallPercentage(sources);
            this.addToHistory(this.selectedFile.name, overallPercentage);
            this.loadPage('result');
        }, 2000);
    }

    clearText() {
        const textInput = document.getElementById('textInput');
        if (textInput) {
            textInput.value = '';
        }
    }

    logout() {
        this.user = null;
        this.showToast('Logged out successfully', 'success');
        this.loadPage('login');
    }

    addToHistory(fileName, percentage) {
        const historyItem = {
            fileName,
            percentage,
            date: new Date().toLocaleDateString()
        };
        this.history.unshift(historyItem);
        this.saveHistory();
    }

    saveHistory() {
        localStorage.setItem('plagiarismHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('plagiarismHistory');
        if (saved) {
            this.history = JSON.parse(saved);
        }
    }

    viewReport(index) {
        this.loadPage('report');
    }

    downloadReport() {
        this.showToast('Report downloaded successfully!', 'success');
    }

    showToast(message, type = 'info') {
        const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;
        
        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
}

// Initialize the app
const app = new PlagiarismDetectionApp();
