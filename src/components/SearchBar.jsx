import { useEffect, useRef, useState } from 'react';
import { Search, Rocket } from 'lucide-react';

export default function SearchBar({ defaultValue = '', onSearch, onLucky }) {
  const [q, setQ] = useState(defaultValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setQ(defaultValue);
  }, [defaultValue]);

  const submit = (e) => {
    e?.preventDefault();
    onSearch?.(q);
  };

  return (
    <form onSubmit={submit} className="group relative">
      <div className="flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus-within:ring-2 ring-cyan-400">
        <Search className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />
        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the universe..."
          className="flex-1 bg-transparent outline-none text-base md:text-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
        />
        <button
          type="button"
          onClick={onLucky}
          className="hidden sm:inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow hover:brightness-110 active:scale-[0.98]"
        >
          <Rocket className="h-4 w-4" />
          Lucky
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 active:scale-[0.98]"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </form>
  );
}
