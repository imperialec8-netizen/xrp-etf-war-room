// app/api/tracker/route.ts
import { NextResponse } from "next/server";

const REMOTE_TRACKER_URL = "https://api.xrpinsights.vercel.app/tracker"; 
// ^ use the exact URL from DevTools

export async function GET() {
  try {
    const res = await fetch(REMOTE_TRACKER_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream tracker error" },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Optionally pick only the fields you care about:
    const snapshot = {
      priceUsd: data.priceUsd,
      totalAumUsd: data.totalAumUsd,
      totalXrpLocked: data.totalXrpLocked,
    };

    return NextResponse.json(snapshot);
  } catch (err) {
    console.error("Tracker proxy failed:", err);
    return NextResponse.json(
      { error: "Tracker proxy failed" },
      { status: 500 }
    );
  }
}
