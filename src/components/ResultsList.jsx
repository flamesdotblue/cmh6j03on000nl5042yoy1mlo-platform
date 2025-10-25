import { ExternalLink, Star } from 'lucide-react';

function ResultCard({ item }) {
  return (
    <div className="group rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow hover:shadow-lg transition-shadow">
      <a href={item.url} target="_blank" rel="noreferrer noopener" className="block">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 group-hover:underline">
              {item.title}
            </h3>
            <div className="text-xs text-emerald-700 dark:text-emerald-300 truncate">{item.url}</div>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(item.rating || 0) ? 'fill-amber-500' : 'opacity-30'}`} />
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3">
          {item.description}
        </p>
        {item.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.slice(0, 4).map((t) => (
              <span key={t} className="text-xs rounded-full px-2 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200">
                {t}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-4 inline-flex items-center gap-1 text-sm text-blue-700 dark:text-blue-300">
          Visit <ExternalLink className="h-4 w-4" />
        </div>
      </a>
    </div>
  );
}

export default function ResultsList({ title, results }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">{results.length} results</span>
      </div>
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        {results.map((r) => (
          <ResultCard key={r.id} item={r} />
        ))}
      </div>
    </div>
  );
}
