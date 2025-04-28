const SingleAnalyzerSelector = ({ analyzers, selected, onSelect, isAnalyzing }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-gray-700">Select an analyzer:</h3>
      {analyzers.map((analyzer) => (
        <label
          key={analyzer}
          className={`flex items-center p-2 rounded-lg transition cursor-pointer ${
            selected === analyzer
              ? "bg-green-100 border-2 border-green-500"
              : "bg-gray-100 hover:bg-gray-200"
          } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="radio"
            name="analyzer-radio-group"
            checked={selected === analyzer}
            onChange={() => !isAnalyzing && onSelect(selected === analyzer ? null : analyzer)}
            disabled={isAnalyzing}
            className="mr-2"
          />
          {analyzer}
        </label>
      ))}
    </div>
  );
};

export default SingleAnalyzerSelector;