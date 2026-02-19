export function Header({ title }: { title?: string; }) {
  return (
    <header className="border-b border-stone-200 h-30">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-main text-4xl font-bold">{title}</h1>
        <span>Red solidaria animal</span>
      </div>
    </header>
  );
}