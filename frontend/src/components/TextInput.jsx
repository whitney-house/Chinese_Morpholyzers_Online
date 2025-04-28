const TextInput = ({ input, onChange, isAnalyzing }) => {
	return (
	  <textarea
		value={input}
		onChange={onChange}
		disabled={isAnalyzing}
		placeholder="Please type Chinese or upload a .txt file containing Chinese"
		className={`flex-1 h-60 p-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm ${
		  isAnalyzing ? "bg-gray-200 cursor-not-allowed" : ""
		}`}
	  />
	);
  };
  
  export default TextInput;
  