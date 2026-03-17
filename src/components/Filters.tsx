export function Filters({
  onFilterChange,
  filtered
}: {
  onFilterChange: (filter: string) => void;
  filtered: string;
}) {
  const filters = ['ALL', 'ADOPTION', 'RESCUE', 'LOST', 'TRANSITION'];

  return (
    <div className="bg-white py-2 px-3 border-b border-stone-200 overflow-x-auto">
      <div className="flex gap-2 w-max mx-auto">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap shrink-0 transition-all sm:grow sm:max-w-40 hover:bg-stone-200 ${filtered === filter
              ? 'bg-main text-white!'
              : 'bg-stone-100 text-stone-600!'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}