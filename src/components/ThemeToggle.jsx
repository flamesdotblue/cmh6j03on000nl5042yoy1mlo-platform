import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme = 'dark', onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur px-3 py-2 text-sm hover:shadow active:scale-[0.98]"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-600" />
      )}
      <span className="hidden sm:inline">{isDark ? 'Day' : 'Night'}</span>
    </button>
  );
}
