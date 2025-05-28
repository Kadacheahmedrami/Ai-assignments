"use client"
import React, { useState } from 'react';
import { Play, Terminal, Code2 } from 'lucide-react';

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

    # Diagnostic rules
    medical_kb.tell(expr("Fever(x) & Cough(x) & SoreThroat(x) ==> HasStrepThroat(x)"))
    medical_kb.tell(expr("ShortnessOfBreath(x) & ChestPain(x) ==> HasPneumonia(x)"))
    medical_kb.tell(expr("Rash(x) & JointPain(x) ==> HasLymeDisease(x)"))

    print("Knowledge base populated!")
    
    # Test diagnoses
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
        "Leila": ["ShortnessOfBreath", "ChestPain", "Cough"]
    }
    
    rules = {
        "StrepThroat": ["Fever", "Cough", "SoreThroat"],
        "Pneumonia": ["ShortnessOfBreath", "ChestPain"],
        "LymeDisease": ["Rash", "JointPain"]
    }
    
    for patient, symptoms in patients.items():
        print(f"{patient}: {', '.join(symptoms)}")
        for disease, required in rules.items():
            if all(s in symptoms for s in required):
                print(f"  -> {disease}")
`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const executeCode = async () => {
    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      // Use a CORS proxy to bypass CORS restrictions
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = 'https://python-compiler-server-vercel.vercel.app/code';
      
      const response = await fetch(proxyUrl + targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
      // Fallback: Try direct request with mode: 'no-cors' (limited functionality)
      try {
        const response = await fetch('https://python-compiler-server-vercel.vercel.app/code', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code })
        });
        
        setOutput('Code sent for execution (CORS limitation - response not visible)');
      } catch (fallbackErr) {
        setError(`CORS Error: Unable to connect to Python compiler API. 
        
This is a browser security restriction. To fix this:
1. Run the code in a server environment
2. Set up a backend proxy
3. Use the API from a same-origin request

Original error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code2 className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white">AIMA3 Python Compiler</h1>
          </div>
          <button
            onClick={executeCode}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>{isLoading ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-700">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Python Editor</span>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
            placeholder="Write your Python code here..."
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Output</span>
              {isLoading && (
                <div className="flex items-center space-x-2 text-yellow-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">Executing...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 bg-gray-900 p-4 overflow-auto">
            {error ? (
              <div className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                <div className="text-red-300 font-semibold mb-2">❌ Error:</div>
                {error}
              </div>
            ) : output ? (
              <div className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                <div className="text-green-300 font-semibold mb-2">✅ Output:</div>
                {output}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                Click "Run Code" to execute your Python code.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMA3Compiler;