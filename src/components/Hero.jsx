import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <div className="relative h-full w-full">
      <Spline
        scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),rgba(0,0,0,0)_60%)]" />
      <div className="absolute inset-x-0 top-10 flex items-center justify-center">
        <h1 className="pointer-events-none text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 drop-shadow-2xl">
          Koogle
        </h1>
      </div>
    </div>
  );
}
