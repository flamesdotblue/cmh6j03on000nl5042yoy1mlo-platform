import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import { sites as DATASET } from './data/sites';

function applyThemeClass(nextTheme) {
  const root = document.documentElement;
  if (nextTheme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

function getInitialTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function scoreItem(q, item) {
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  const title = item.title.toLowerCase();
  const desc = item.description.toLowerCase();
  const url = item.url.toLowerCase();
  const tags = (item.tags || []).join(' ').toLowerCase();

  let score = 0;
  if (title === query) score += 50;
  if (title.includes(query)) score += 30;
  if (url.includes(query)) score += 20;
  if (desc.includes(query)) score += 15;
  if (tags.includes(query)) score += 10;

  // slight boost for rated/popular items
  score += (item.rating || 0) * 2;
  return score;
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const init = getInitialTheme();
    setTheme(init);
    applyThemeClass(init);
  }, []);

  useEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const onSearch = (q) => {
    const trimmed = q.trim();
    setQuery(trimmed);
    if (!trimmed) {
      setResults([]);
      setSearched(true);
      return;
    }
    const scored = DATASET
      .map((item) => ({ item, score: scoreItem(trimmed, item) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item);
    setResults(scored);
    setSearched(true);
  };

  const trending = useMemo(() => {
    return [...DATASET]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#0b0b10] dark:text-neutral-100 transition-colors">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 bg-white/80 dark:bg-black/30 border-b border-black/5 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-cyan-400 to-emerald-400 animate-pulse" />
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400">koogle</span>
          </a>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </div>
      </header>

      <main>
        <section className="relative h-[64vh] w-full overflow-hidden">
          <Hero />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl">
              <SearchBar
                defaultValue={query}
                onSearch={onSearch}
                onLucky={() => {
                  const first = results[0] || trending[0];
                  if (first?.url) window.open(first.url, '_blank', 'noopener,noreferrer');
                }}
              />
              <p className="mt-3 text-center text-sm text-neutral-600 dark:text-neutral-300">
                Explore the cosmos of the web with Koogle. Day and night ready.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-10">
          {results.length > 0 ? (
            <ResultsList title={`Results for "${query}"`} results={results} />
          ) : (
            <>
              {searched && query && (
                <div className="text-center text-neutral-500 dark:text-neutral-400 mb-8">
                  No direct hits found. Showing popular picks instead.
                </div>
              )}
              <ResultsList title="Trending on Koogle" results={trending} />
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
