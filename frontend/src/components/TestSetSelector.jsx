const TestSetSelector = ({ selectedTestSet, setSelectedTestSet, isAnalyzing }) => {
	const testSets = ["msr", "pku", "other"];
	return (
	  <div className="flex flex-col gap-2">
		<label className="font-semibold">Choose a test set:</label>
		<select
		  value={selectedTestSet}
		  onChange={(e) => setSelectedTestSet(e.target.value)}
		  disabled={isAnalyzing}
		  className="p-2 rounded border"
		>
		  <option value="">-- Select Test Set --</option>
		  {testSets.map((set) => (
			<option key={set} value={set}>
			  {set.toUpperCase()}
			</option>
		  ))}
		</select>
	  </div>
	);
  };
  
  export default TestSetSelector;
  