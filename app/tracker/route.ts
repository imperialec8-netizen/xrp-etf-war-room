// app/api/tracker/route.ts
import { NextResponse } from "next/server";

type TrackerSnapshot = {
  priceUsd: number;
  totalAumUsd: number;
  totalXrpLocked: number;
};

const FALLBACK: TrackerSnapshot = {
  priceUsd: 2.2177,
  totalAumUsd: 778_220_000,
  totalXrpLocked: 329_480_000,
};

export async function GET() {
  const upstream = process.env.TRACKER_UPSTREAM_URL;

  if (!upstream) {
    return NextResponse.json(FALLBACK);
  }

  try {
    const res = await fetch(upstream, { next: { revalidate: 60 } });

    if (!res.ok) {
      throw new Error(`Tracker upstream status ${res.status}`);
    }

    const raw = await res.json();

    const snapshot: TrackerSnapshot = {
      priceUsd: raw.priceUsd ?? FALLBACK.priceUsd,
      totalAumUsd: raw.totalAumUsd ?? FALLBACK.totalAumUsd,
      totalXrpLocked: raw.totalXrpLocked ?? FALLBACK.totalXrpLocked,
    };

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Tracker upstream failed:", error);
    return NextResponse.json(FALLBACK);
  }
}
