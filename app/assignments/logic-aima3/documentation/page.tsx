import React from "react"
import { Terminal, Code, Server, Play, FileCode, Cpu, Network, Shield, Clock, CheckCircle, AlertTriangle, Zap } from "lucide-react"

const AIMA3CompilerDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
                AIMA3 Python Compiler
              </span>
              <span className="block text-white mt-1">System Documentation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive web-based Python IDE with AIMA3 library integration for Artificial Intelligence assignments and research
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* System Overview */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">System Overview</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The AIMA3 Python Compiler is a sophisticated web-based IDE specifically designed for running Python code with the AIMA3 (Artificial Intelligence: A Modern Approach, 3rd Edition) library pre-installed. The system provides a seamless environment for students and researchers to work with AI algorithms without the complexity of local environment setup.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Code className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">VS Code-like Interface</h3>
                <p className="text-sm text-gray-400">Professional code editor with syntax highlighting</p>
              </div>
              <div className="text-center p-4">
                <Server className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Server-side Execution</h3>
                <p className="text-sm text-gray-400">Secure Python subprocess execution</p>
              </div>
              <div className="text-center p-4">
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">AIMA3 Ready</h3>
                <p className="text-sm text-gray-400">Pre-configured with AI library</p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-green-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">System Architecture</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Frontend Components</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-blue-300">Code Editor</span>
                    <span className="text-gray-400">React + Monaco-like</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-green-300">Output Terminal</span>
                    <span className="text-gray-400">Real-time results</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-yellow-300">Status Bar</span>
                    <span className="text-gray-400">Live feedback</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-purple-300">Control Panel</span>
                    <span className="text-gray-400">Run, Copy, Download</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Backend Infrastructure</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-blue-300">Next.js API Routes</span>
                    <span className="text-gray-400">/api/run-code</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-green-300">Python Subprocess</span>
                    <span className="text-gray-400">Isolated execution</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-yellow-300">AIMA3 Environment</span>
                    <span className="text-gray-400">Pre-installed libraries</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-purple-300">Security Layer</span>
                    <span className="text-gray-400">Sandboxed execution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">How The Compiler Works</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Code Input & Validation</h3>
                  <p className="text-gray-300 mb-3">User writes Python code in the VS Code-like editor interface with syntax highlighting, line numbers, and real-time cursor tracking.</p>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <code className="text-blue-300 text-sm">
                      Frontend: React component captures code changes and validates syntax
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">API Request to Server</h3>
                  <p className="text-gray-300 mb-3">When user clicks "Run Code", the frontend sends a POST request to the Next.js API route with the Python code as payload.</p>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <code className="text-green-300 text-sm">
                      POST /api/run-code {'{'} code: "from aima3.logic import *..." {'}'}
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Subprocess Creation</h3>
                  <p className="text-gray-300 mb-3">The server creates an isolated Python subprocess with AIMA3 library pre-installed, ensuring secure execution environment.</p>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <code className="text-yellow-300 text-sm">
                      subprocess.run(['python3', '-c', user_code], capture_output=True)
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Code Execution & Results</h3>
                  <p className="text-gray-300 mb-3">Python code runs in the subprocess with access to AIMA3 modules. Output, errors, and execution status are captured and returned to the client.</p>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <code className="text-purple-300 text-sm">
                      Response: {'{'} success: true, stdout: "output", stderr: "errors" {'}'}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-cyan-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Technical Implementation</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Network className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Frontend Architecture</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>React with TypeScript:</strong> Type-safe component development with hooks for state management
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Tailwind CSS:</strong> Utility-first styling with responsive design and dark theme
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Lucide Icons:</strong> Professional icon set for enhanced UI/UX
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Monaco-like Editor:</strong> VS Code-style editor with syntax highlighting and line numbers
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Server className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Backend Implementation</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Next.js API Routes:</strong> Server-side endpoints for handling code execution requests
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Python Subprocess:</strong> Isolated execution environment with timeout protection
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>AIMA3 Library:</strong> Pre-installed AI algorithms and data structures
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Error Handling:</strong> Comprehensive error catching and user-friendly error messages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AIMA3 Integration */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-red-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">AIMA3 Library Integration</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileCode className="h-5 w-5 text-red-400 mr-2" />
                  Available Modules
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <div className="text-red-300 font-medium">aima3.logic</div>
                    <div className="text-gray-400 text-sm">First-order logic, knowledge bases, inference</div>
                  </div>
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <div className="text-red-300 font-medium">aima3.search</div>
                    <div className="text-gray-400 text-sm">Search algorithms, problem solving</div>
                  </div>
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <div className="text-red-300 font-medium">aima3.csp</div>
                    <div className="text-gray-400 text-sm">Constraint satisfaction problems</div>
                  </div>
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <div className="text-red-300 font-medium">aima3.learning</div>
                    <div className="text-gray-400 text-sm">Machine learning algorithms</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Play className="h-5 w-5 text-green-400 mr-2" />
                  Example Usage
                </h3>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-gray-400"># Medical diagnosis example</div>
                  <div className="text-blue-300">from aima3.logic import *</div>
                  <div className="text-white">medical_kb = FolKB()</div>
                  <div className="text-green-300">medical_kb.tell(expr("Fever(Ahmad)"))</div>
                  <div className="text-yellow-300">medical_kb.tell(expr("Cough(Ahmad)"))</div>
                  <div className="text-purple-300">rule = "Fever(x) & Cough(x) ==> HasFlu(x)"</div>
                  <div className="text-green-300">medical_kb.tell(expr(rule))</div>
                  <div className="text-gray-400"># Query the knowledge base</div>
                  <div className="text-cyan-300">result = fol_bc_ask(medical_kb, expr("HasFlu(Ahmad)"))</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Performance */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-yellow-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Security & Performance</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Shield className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Security Measures</h3>
              <div className="space-y-3">
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Isolated subprocess execution
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Limited system access
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Timeout protection
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Input validation and sanitization
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resource usage limits
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Cpu className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Performance Features</h3>
              <div className="space-y-3">
                <div className="flex items-center text-blue-300">
                  <Clock className="h-4 w-4 mr-2" />
                  Fast execution with optimized subprocess
                </div>
                <div className="flex items-center text-blue-300">
                  <Terminal className="h-4 w-4 mr-2" />
                  Real-time output streaming
                </div>
                <div className="flex items-center text-blue-300">
                  <Code className="h-4 w-4 mr-2" />
                  Efficient code validation
                </div>
                <div className="flex items-center text-blue-300">
                  <Network className="h-4 w-4 mr-2" />
                  Asynchronous request handling
                </div>
                <div className="flex items-center text-blue-300">
                  <Zap className="h-4 w-4 mr-2" />
                  Cached library imports
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Scenarios */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Usage Scenarios</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-700/30 rounded-lg p-6">
                <div className="bg-indigo-500/20 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <Code className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI Course Assignments</h3>
                <p className="text-gray-300 text-sm">Students can complete AI assignments using AIMA3 algorithms without local setup complexity</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-6">
                <div className="bg-green-500/20 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <Terminal className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Research Prototyping</h3>
                <p className="text-gray-300 text-sm">Researchers can quickly test AI algorithms and logic implementations</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-6">
                <div className="bg-purple-500/20 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <Play className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Interactive Learning</h3>
                <p className="text-gray-300 text-sm">Immediate feedback and execution for better understanding of AI concepts</p>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-orange-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">System Requirements & Limitations</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Server Requirements</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                    <span>Python Version:</span>
                    <span className="text-green-400">3.8+</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                    <span>AIMA3 Library:</span>
                    <span className="text-green-400">Latest</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                    <span>Node.js:</span>
                    <span className="text-green-400">18+</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                    <span>Next.js:</span>
                    <span className="text-green-400">13+</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Current Limitations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-yellow-400">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    No file system access for security
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Limited execution time (timeout protection)
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    No persistent data between runs
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Limited to AIMA3 and standard libraries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-400 font-bold text-xl">AIMA3 Python Compiler</span>
          <p className="text-gray-400 mt-2">© 2025 AI Education Platform - Server-side Python Execution System</p>
        </div>
      </footer>
    </div>
  )
}

export default AIMA3CompilerDocumentation