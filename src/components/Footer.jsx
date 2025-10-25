export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div>
          <span className="font-semibold">koogle</span> · a playful search UI demo
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <span className="opacity-60">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
