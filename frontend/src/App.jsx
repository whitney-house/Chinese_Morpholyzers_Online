import { useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import SingleAnalyzerSelector from "./components/SingleAnalyzerSelector";
import MultipleAnalyzerSelector from "./components/MultipleAnalyzerSelector";
import FileUploader from "./components/FileUploader";
import ErrorMessage from "./components/ErrorMessage";
import ResultDisplay from "./components/ResultDisplay";
import TestSetSelector from "./components/TestSetSelector";
import EvaluationResultTable from "./components/EvaluationResultTable";

function App() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSegmentAnalyzer, setSelectedSegmentAnalyzer] = useState(null);
  const [selectedEvaluateAnalyzers, setSelectedEvaluateAnalyzers] = useState([]);
  const [segmentResult, setSegmentResult] = useState({
    text: "",
    downloadId: "",
    result: null
  });
  const [selectedFunction, setSelectedFunction] = useState(null); // "segment" or "evaluate"
  const [selectedTestSet, setSelectedTestSet] = useState(""); // msr / pku / other
  const [evalResult, setEvalResult] = useState([]); // array of result per tool
  const [isAnalyzing, setIsAnalyzing] = useState(false); // For freeze page when user finish the input

  const analyzers = ["jieba", "THULAC", "HanLp", "LTP", "snowNLP"]; // Analyzers array

  const BASE_URL = import.meta.env.VITE_API_URL || '';
 
 

  // Handle text input
  const handleTextChange = (event) => {
    const value = event.target.value;
    setInput(value);
    setSegmentResult({ text: "", downloadId: "", result: null });
    setErrorMessage("");
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setInput(text);
        setSegmentResult({ text: "", downloadId: "", result: null });
        setErrorMessage("");
      };
      reader.readAsText(file);
    }
  };

  const handleSegment = async () => {
    if (!input.trim()) {
      setErrorMessage("❌ Please enter text or upload a file before segmentation.");
      return;
    }
    if (!selectedSegmentAnalyzer) {
      setErrorMessage("❌ Please select an analyzer before segmentation.");
      return;
    }
    setIsAnalyzing(true); // Freeze UI
 
    try {
      const res = await fetch(`${BASE_URL}/api/segment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, analyzer: selectedSegmentAnalyzer }),
      });
      const { result } = await res.json();
  
      setSegmentResult({
        inputText: input,
        analyzer: selectedSegmentAnalyzer,
        result,
      });
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEvaluate = async () => {
    if (!selectedTestSet) {
      setErrorMessage("❌ Please select a dataset before evaluation.");
      return;
    }
    
    if (selectedEvaluateAnalyzers.length < 2) {
      setErrorMessage("❌ Please select at least two analyzers for comparison.");
      return;
    }
  
    setIsAnalyzing(true);
    try {
      const res = await fetch(`${BASE_URL}/api/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test_set: selectedTestSet,
          analyzers: selectedEvaluateAnalyzers
        })
      });
  
      const data = await res.json();
      setEvalResult(data);
    } catch (err) {
      setErrorMessage("❌ Evaluation failed: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setSegmentResult({ text: "", downloadId: "", result: null });
    setEvalResult([]);
    setErrorMessage("");
    setSelectedSegmentAnalyzer(null);
    setSelectedEvaluateAnalyzers([]);
  };

  const handleDownload = () => {
    if (!segmentResult.result) {
      setErrorMessage("No segmentation result to download.");
      return;
    }
  
    const blob = new Blob([segmentResult.result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedSegmentAnalyzer}_segmentation.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6 overflow-auto"> 
      <div className="flex flex-col items-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Chinese Morphology Analyser Comparison Tool
          </h1>

          {/* Mode Selection */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded shadow">
              <button 
                className={`px-4 py-2 border ${selectedFunction === 'segment' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-l`}
                onClick={() => setSelectedFunction('segment')}
              >
                Segment Text
              </button>
              <button 
                className={`px-4 py-2 border ${selectedFunction === 'evaluate' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-r`}
                onClick={() => setSelectedFunction('evaluate')}
              >
                Evaluate Analyzers
              </button>
            </div>
          </div>

          {/* Segment Mode Content */}
          {selectedFunction === 'segment' && (
            <>
              <div className="flex flex-row w-full gap-4 mb-4">
                <TextInput input={input} onChange={handleTextChange} isAnalyzing={isAnalyzing} />
                <SingleAnalyzerSelector 
                  analyzers={analyzers}
                  selected={selectedSegmentAnalyzer}
                  onSelect={setSelectedSegmentAnalyzer}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              <div className="flex flex-row gap-4 mb-4">
                <FileUploader onUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
                <div className="flex-1">
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSegment}
                    disabled={isAnalyzing || !selectedSegmentAnalyzer || !input.trim()}
                  >
                    Segment Text
                  </button>
                </div>
              </div>

              {/* Results display for segmentation */}
              {segmentResult.result && (
                <div className="mt-4">
                  <ResultDisplay 
                    result={segmentResult.result} 
                    analyzer={selectedSegmentAnalyzer} 
                  />
                  
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      disabled={isAnalyzing}
                    >
                      Download Result
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Evaluate Mode Content */}
          {selectedFunction === 'evaluate' && (
            <>
              <div className="mb-4">
                <MultipleAnalyzerSelector
                  analyzers={analyzers}
                  selected={selectedEvaluateAnalyzers}
                  onSelect={setSelectedEvaluateAnalyzers}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              <div className="mb-4">
                <TestSetSelector
                  selectedTestSet={selectedTestSet}
                  setSelectedTestSet={setSelectedTestSet}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                onClick={handleEvaluate}
                disabled={isAnalyzing || selectedEvaluateAnalyzers.length < 2 || !selectedTestSet}
              >
                Run Evaluation
              </button>

              {/* Evaluation results */}
              {evalResult.length > 0 && (
                <EvaluationResultTable results={evalResult} />
              )}
            </>
          )}

          <ErrorMessage message={errorMessage} />

          {/* Clear button always visible */}
          <button
            className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            onClick={handleClear}
            disabled={isAnalyzing}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;