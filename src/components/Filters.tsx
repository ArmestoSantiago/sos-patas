export function Filters({ onFilterChange, filtered }: { onFilterChange: (filter: string) => void; filtered: string; }) {
  const filters = ['ALL', 'ADOPTION', 'RESCUE', 'LOST', 'TRANSITION'];

  return <div className="bg-white py-2 px-1 border-b border-stone-200  overflow-x-auto flex gap-2">
    {filters.map(filter => {

      return <button key={filter} onClick={() => onFilterChange(filter)} className={`px-4 py-2 flex-1 rounded-full font-semibold text-sm whitespace-nowrap transition-all hover:bg-stone-200 ${filtered === filter ? 'bg-main text-white!' : 'bg-stone-100 text-stone-600!'} `}>{filter}</button>;
    })}
  </div>;
};