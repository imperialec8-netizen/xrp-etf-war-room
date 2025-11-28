// app/page.tsx
import TrackerClient, { TrackerSnapshot } from "./TrackerClient";

// Fallback in case the API URL is missing or fails on first load
const FALLBACK: TrackerSnapshot = {
  priceUsd: 2.2177,
  totalAumUsd: 778_220_000,
  totalXrpLocked: 329_480_000,
};

async function getInitialSnapshot(): Promise<TrackerSnapshot> {
  const upstream = process.env.NEXT_PUBLIC_TRACKER_API_URL;

  if (!upstream) {
    console.warn("NEXT_PUBLIC_TRACKER_API_URL not set, using FALLBACK");
    return FALLBACK;
  }

  try {
    const res = await fetch(upstream, {
      next: { revalidate: 60 }, // same 60s revalidate on the server
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
      <TrackerClient initialSnapshot={initialSnapshot} />
    </main>
  );
}
