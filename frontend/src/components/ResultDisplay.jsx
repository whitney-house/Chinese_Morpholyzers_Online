const ResultDisplay = ({ result, analyzer, onDownload }) => (
	<div className="mt-4 p-4 bg-gray-100 rounded-md shadow-inner max-h-80 overflow-y-auto">
	  {/* <h2 className="text-lg font-bold mb-2">Analysis Result:</h2>
   */}
	  {analyzer && (
		<p className="text-sm text-blue-600 mb-2">
		  <strong>Result of Analyzer:</strong> {analyzer}
		</p>
	  )}
  
	  <pre className="text-sm whitespace-pre-wrap text-gray-800">
		{Array.isArray(result) ? result.join(" / ") : result}
	  </pre>
  
	  
	</div>
  );
	
  export default ResultDisplay;
  