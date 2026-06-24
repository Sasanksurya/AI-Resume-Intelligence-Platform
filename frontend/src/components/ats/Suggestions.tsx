interface SuggestionsProps {
  suggestions: string[];
}

export default function Suggestions({
  suggestions,
}: SuggestionsProps) {
  return (
    <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-blue-700">
        💡 Suggestions
      </h2>

      {suggestions.length === 0 ? (
        <p className="text-gray-500">
          No suggestions.
        </p>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="rounded-md bg-blue-100 px-3 py-2"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}