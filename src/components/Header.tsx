export function Header({ title }: { title?: string; }) {
  return (
    <header className="border-b border-stone-200 h-20 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <span>
            <div className="w-12 h-12 bg-linear-to-br from-[#2E7D32] to-[#4CAF50] rounded-xl flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paw-print text-white" aria-hidden="true" ><circle cx="11" cy="4" r="2"></circle><circle cx="18" cy="8" r="2"></circle><circle cx="20" cy="16" r="2"></circle><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"></path></svg>
            </div>
          </span>
          <div>
            <h1 className="text-main text-2xl font-bold">
              <span>{title}</span>
            </h1>
            <span>
              <p>Red solidaria animal
              </p>
            </span>
          </div>
        </div>

      </div>
    </header >
  );
}