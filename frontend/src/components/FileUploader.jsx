const FileUploader = ({ onUpload, isAnalyzing }) => {
	return (
	  <label className={isAnalyzing ? "cursor-not-allowed" : "cursor-pointer"}>
		<input
		  type="file"
		  accept=".txt"
		  onChange={isAnalyzing ? undefined : onUpload}
		  className="hidden"
		  disabled={isAnalyzing}
		/>
		<span
		  className={`inline-flex py-2 px-4 rounded-lg transition ${
			isAnalyzing
			  ? "bg-gray-300 text-gray-600"
			  : "bg-blue-500 text-white hover:bg-blue-600"
		  }`}
		>
		  Upload .txt file
		</span>
	  </label>
	);
  };
  
  export default FileUploader;
  