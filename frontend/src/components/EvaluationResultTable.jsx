const EvaluationResultTable = ({ results }) => {
	return (
	  <div className="overflow-x-auto mt-4">
		<table className="w-full text-sm text-left bg-white rounded shadow">
		  <thead className="bg-gray-100 text-gray-700">
			<tr>
			  <th className="px-4 py-2">Analyzer</th>
			  <th className="px-4 py-2">Precision (%)</th>
			  <th className="px-4 py-2">Recall (%)</th>
			  <th className="px-4 py-2">F1 Score</th>
			  <th className="px-4 py-2">Time (s)</th>
			</tr>
		  </thead>
		  <tbody>
			{results.map((item) => (
			  <tr key={item.tool} className="border-t">
				<td className="px-4 py-2">{item.tool}</td>
				<td className="px-4 py-2">{item.precision ?? "-"}</td>
				<td className="px-4 py-2">{item.recall ?? "-"}</td>
				<td className="px-4 py-2">{item.f1 ?? "-"}</td>
				<td className="px-4 py-2">{item.time ?? "-"}</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  </div>
	);
  };
  
  export default EvaluationResultTable;
  