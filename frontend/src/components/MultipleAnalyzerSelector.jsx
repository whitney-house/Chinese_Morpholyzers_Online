const MultipleAnalyzerSelector = ({ analyzers, selected, onSelect, isAnalyzing }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-gray-700">Select analyzers (min 2):</h3>
      {analyzers.map((analyzer) => (
        <label
          key={analyzer}
          className={`flex items-center p-2 rounded-lg transition cursor-pointer ${
            selected.includes(analyzer)
              ? "bg-green-100 border-2 border-green-500"
              : "bg-gray-100 hover:bg-gray-200"
          } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="checkbox"
            checked={selected.includes(analyzer)}
            onChange={() => {
              if (isAnalyzing) return;
              const newSelection = selected.includes(analyzer)
                ? selected.filter((a) => a !== analyzer)
                : [...selected, analyzer];
              onSelect(newSelection);
            }}
            disabled={isAnalyzing}
            className="mr-2"
          />
          {analyzer}
        </label>
      ))}
    </div>
  );
};

export default MultipleAnalyzerSelector;