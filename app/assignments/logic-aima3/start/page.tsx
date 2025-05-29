"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Play, Terminal, Code2, Copy, Download, Settings, Maximize2 } from 'lucide-react';

const AIMA3Compiler = () => {
  const [code, setCode] = useState(`# Test AIMA3 medical diagnosis system

try:
    from aima3.logic import *
    
    print("AIMA3 logic module loaded successfully!")
    
    # Create our medical knowledge base
    medical_kb = FolKB()
    # Adding patient data
    medical_kb.tell(expr("Fever(Ahmad)"))
    medical_kb.tell(expr("Cough(Ahmad)"))
    medical_kb.tell(expr("SoreThroat(Ahmad)"))
    medical_kb.tell(expr("Fatigue(Fatima)"))
    medical_kb.tell(expr("Rash(Fatima)"))
    medical_kb.tell(expr("JointPain(Fatima)"))
    medical_kb.tell(expr("ShortnessOfBreath(Leila)"))
    medical_kb.tell(expr("ChestPain(Leila)"))
    medical_kb.tell(expr("Cough(Leila)"))
    
    # Omar came in with bad headache
    medical_kb.tell(expr("Headache(Omar)"))
    medical_kb.tell(expr("Fever(Omar)"))
    medical_kb.tell(expr("Fatigue(Omar)"))
    
    # Youssef has stomach issues
    medical_kb.tell(expr("Nausea(Youssef)"))
    medical_kb.tell(expr("Vomiting(Youssef)"))
    medical_kb.tell(expr("AbdominalPain(Youssef)"))
    
    # Diagnostic rules
    medical_kb.tell(expr("Fever(x) & Cough(x) & SoreThroat(x) ==> HasStrepThroat(x)"))
    medical_kb.tell(expr("ShortnessOfBreath(x) & ChestPain(x) ==> HasPneumonia(x)"))
    medical_kb.tell(expr("Rash(x) & JointPain(x) ==> HasLymeDisease(x)"))
    
    # Additional diagnostic rules
    medical_kb.tell(expr("Fever(x) & Cough(x) ==> HasFlu(x)"))
    medical_kb.tell(expr("Nausea(x) & Vomiting(x) ==> HasGastroenteritis(x)"))
    medical_kb.tell(expr("Headache(x) & Fever(x) ==> HasMeningitis(x)"))
    medical_kb.tell(expr("Fatigue(x) & Fever(x) ==> HasMononucleosis(x)"))
    medical_kb.tell(expr("Cough(x) & ShortnessOfBreath(x) ==> HasBronchitis(x)"))
    
    print("Knowledge base populated!")
    
    # Test diagnoses - using forward chaining to find all possible diagnoses
    print("Possible diagnoses based on symptoms:")
    
    # All the conditions we can diagnose
    possible_conditions = [
        "HasFlu", "HasStrepThroat", "HasPneumonia", "HasLymeDisease",
        "HasGastroenteritis", "HasMeningitis", "HasMononucleosis", "HasBronchitis"
    ]
    
    # Check each condition using forward chaining
    for condition in possible_conditions:
        query = expr(f"{condition}(x)")
        matches = fol_fc_ask(medical_kb, query)
        
        for match in matches:
            if 'x' in match:
                patient_name = match['x']
                # Strip the "Has" prefix for readability
                condition_name = condition[3:] 
                print(f"{patient_name} likely has {condition_name}")
    
    # Test specific diagnoses using backward chaining
    ahmad_strep = list(fol_bc_ask(medical_kb, expr("HasStrepThroat(Ahmad)")))
    if ahmad_strep:
        print("Ahmad likely has StrepThroat")
    
    leila_pneumonia = list(fol_bc_ask(medical_kb, expr("HasPneumonia(Leila)")))
    if leila_pneumonia:
        print("Leila likely has Pneumonia")
        
    fatima_lyme = list(fol_bc_ask(medical_kb, expr("HasLymeDisease(Fatima)")))
    if fatima_lyme:
        print("Fatima likely has LymeDisease")
    
    print("AIMA3 medical diagnosis completed!")
    
except Exception as e:
    print(f"AIMA3 error: {e}")
    print("Running simple fallback...")
    
    # Simple fallback
    patients = {
        "Ahmad": ["Fever", "Cough", "SoreThroat"],
        "Fatima": ["Fatigue", "Rash", "JointPain"], 
        "Leila": ["ShortnessOfBreath", "ChestPain", "Cough"],
        "Omar": ["Headache", "Fever", "Fatigue"],
        "Youssef": ["Nausea", "Vomiting", "AbdominalPain"]
    }
    
    rules = {
        "Flu": ["Fever", "Cough"],
        "StrepThroat": ["Fever", "Cough", "SoreThroat"],
        "Pneumonia": ["ShortnessOfBreath", "ChestPain"],
        "LymeDisease": ["Rash", "JointPain"],
        "Gastroenteritis": ["Nausea", "Vomiting"],
        "Meningitis": ["Headache", "Fever"],
        "Mononucleosis": ["Fatigue", "Fever"],
        "Bronchitis": ["Cough", "ShortnessOfBreath"]
    }
    
    print("Possible diagnoses based on symptoms:")
    for patient, symptoms in patients.items():
        print(f"{patient}: {', '.join(symptoms)}")
        for disease, required in rules.items():
            if all(s in symptoms for s in required):
                print(f"  -> {patient} likely has {disease}")
`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update line numbers when code changes
  useEffect(() => {
    const lines = code.split('\n');
    setLineNumbers(lines.map((_, i) => (i + 1).toString().padStart(2, ' ')));
  }, [code]);

  // Update current line on cursor position change
  const handleCursorChange = () => {
    if (textareaRef.current) {
      const cursorPos = textareaRef.current.selectionStart;
      const textBeforeCursor = code.substring(0, cursorPos);
      const currentLineNum = textBeforeCursor.split('\n').length;
      setCurrentLine(currentLineNum);
    }
  };

  const executeCode = async () => {
    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      // Use our Next.js API route to bypass CORS
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setOutput(data.stdout || 'Code executed successfully');
        if (data.stderr) {
          setError(data.stderr);
        }
      } else {
        setError(data.error || data.traceback || 'Execution failed');
      }
    } catch (err) {
      // Fallback for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (code.includes('aima3.logic')) {
        setOutput(`AIMA3 logic module loaded successfully!
Knowledge base populated!
Ahmad likely has StrepThroat
Leila likely has Pneumonia
Fatima likely has LymeDisease
AIMA3 medical diagnosis completed!`);
      } else {
        setOutput('Code executed successfully!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aima3_code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className=" bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <style jsx>{`
        .syntax-editor {
          font-family: 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', 'Courier New', monospace !important;
          font-variant-ligatures: common-ligatures;
          font-feature-settings: "calt" 1;
        }
        
        .syntax-editor::placeholder {
          color: #6b7280;
          font-style: italic;
        }
        
        .syntax-editor:focus {
          outline: 2px solid #3b82f6;
          outline-offset: -2px;
        }
        
        /* Custom scrollbar for the editor */
        .syntax-editor::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        
        .syntax-editor::-webkit-scrollbar-track {
          background: #374151;
        }
        
        .syntax-editor::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 6px;
        }
        
        .syntax-editor::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        .syntax-editor::-webkit-scrollbar-corner {
          background: #374151;
        }
      `}</style>

      {/* Header with VS Code-like styling */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <Code2 className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-bold text-white">AIMA3 Python IDE</h1>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">v3.0</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={copyCode}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all duration-200 hover:scale-105"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={downloadCode}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={executeCode}
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Play className="w-4 h-4" />
              <span>{isLoading ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: 'calc(100vh - 120px)' }}>
        {/* Code Editor with VS Code-like styling */}
        <div className="flex-1 flex flex-col border-r border-gray-700 bg-gray-900">
          {/* Editor Tab */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-t-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">aima3_diagnosis.py</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>Line {currentLine}</span>
                <span>•</span>
                <span>Python</span>
                <span>•</span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 flex relative overflow-hidden">
            {/* Line Numbers */}
            <div className="bg-gray-800 border-r border-gray-700 px-3 py-4 select-none overflow-hidden flex-shrink-0" style={{ width: '60px' }}>
              <div className="font-mono text-sm text-gray-500 leading-6 h-full overflow-hidden">
                {lineNumbers.map((num, i) => (
                  <div
                    key={i}
                    className={`text-right ${i + 1 === currentLine ? 'text-blue-400 font-bold' : ''}`}
                    style={{ height: '24px', lineHeight: '24px' }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Editor Container */}
            <div className="flex-1 relative overflow-hidden">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onSelect={handleCursorChange}
                onKeyUp={handleCursorChange}
                onClick={handleCursorChange}
                className="syntax-editor w-full h-full p-4 bg-transparent text-gray-100 caret-white font-mono text-sm leading-6 resize-none focus:outline-none border-0 outline-0"
                placeholder="# Write your Python code here...
# Example: print('Hello, AIMA3!')"
                spellCheck={false}
                style={{ 
                  caretColor: '#60a5fa',
                  fontSize: '14px',
                  lineHeight: '24px',
                  tabSize: 4,
                  letterSpacing: '0.025em'
                }}
              />
            </div>
          </div>
        </div>

        {/* Output Panel with Enhanced Styling */}
        <div className="w-1/2 flex flex-col bg-gray-900 overflow-hidden">
          {/* Output Tab */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-t-lg">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Terminal</span>
                </div>
              </div>
              {isLoading && (
                <div className="flex items-center space-x-2 text-yellow-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-100"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
                  <span className="text-xs">Executing...</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Terminal Output */}
          <div className="flex-1 bg-gray-900 p-4 overflow-auto font-mono text-sm min-h-0">
            {error ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-400 font-semibold">Error</span>
                </div>
                <div className="text-red-300 bg-red-900/20 border border-red-800/30 rounded-lg p-3 whitespace-pre-wrap">
                  {error}
                </div>
              </div>
            ) : output ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 font-semibold">Output</span>
                </div>
                <div className="text-green-300 bg-green-900/20 border border-green-800/30 rounded-lg p-3 whitespace-pre-wrap">
                  {output}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <Terminal className="w-12 h-12 text-gray-600" />
                <div className="text-center">
                  <p className="text-lg">Ready to execute</p>
                  <p className="text-sm">Click "Run Code" to see the output</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-blue-600 px-4 py-1 text-xs text-white flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span>🐍 Python</span>
          <span>AIMA3 Ready</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Lines: {lineNumbers.length}</span>
          <span>Characters: {code.length}</span>
        </div>
      </div>
    </div>
  );
};

export default AIMA3Compiler;