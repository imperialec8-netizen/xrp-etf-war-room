import type { TrackerSnapshot } from "./TrackerClient";
import TrackerClient from "./TrackerClient";

// 🔁 Fallback snapshot if API is down or env var missing
const FALLBACK: TrackerSnapshot = {
  priceUsd: 2.2177,         // adjust to your preferred fallback price
  totalAumUsd: 778_220_000, // fallback AUM
  totalXrpLocked: 329_480_000, // fallback locked XRP
};

// 🔌 Server-side: get first snapshot for SSR
async function getInitialSnapshot(): Promise<TrackerSnapshot> {
  const upstream = process.env.NEXT_PUBLIC_TRACKER_API_URL;

  // If not configured yet, just use fallback values
  if (!upstream) {
    return FALLBACK;
  }

  try {
    const res = await fetch(upstream, {
      // revalidate every 60s on the server
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Tracker API status ${res.status}`);
    }

    const data = await res.json();

    return {
      priceUsd: data.priceUsd ?? FALLBACK.priceUsd,
      totalAumUsd: data.totalAumUsd ?? FALLBACK.totalAumUsd,
      totalXrpLocked: data.totalXrpLocked ?? FALLBACK.totalXrpLocked,
    };
  } catch (error) {
    console.error("Failed to load tracker snapshot:", error);
    return FALLBACK;
  }
}

export default async function Home() {
  const initialSnapshot = await getInitialSnapshot();

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        {/* Header */}
        <header className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              VanQish XRP ETF War Room Intel
            </h1>
            <p className="text-sm text-slate-400">
              Live XRP ETF price, AUM, and locked-liquidity snapshot wired to
              your tracker API.
            </p>
          </div>
        </header>

        {/* Client-side dashboard (hybrid mode) */}
        <TrackerClient initialSnapshot={initialSnapshot} />
      </div>
    </main>
  );
}
