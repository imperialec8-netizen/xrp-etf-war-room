// app/api/tracker/route.ts
import { NextResponse } from "next/server";

export type TrackerSnapshot = {
  priceUsd: number;
  totalAumUsd: number;
  totalXrpLocked: number;
};

// Fallback in case upstream is down or env is missing
const FALLBACK: TrackerSnapshot = {
  priceUsd: 2.2177,
  totalAumUsd: 778_220_000,
  totalXrpLocked: 329_480_000,
};

export async function GET() {
  try {
    const upstream = process.env.TRACKER_UPSTREAM_URL;

    // If no upstream is set, just return the fallback
    if (!upstream) {
      console.warn("TRACKER_UPSTREAM_URL not set, returning FALLBACK");
      return NextResponse.json(FALLBACK);
    }

    const res = await fetch(upstream, {
      next: { revalidate: 60 }, // ISR: refresh every 60s on the server
    });

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
