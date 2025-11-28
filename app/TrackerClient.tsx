"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { etfData } from "./etf-data";

export type TrackerSnapshot = {
  priceUsd: number;
  totalAumUsd: number;
  totalXrpLocked: number;
};

type Props = {
  initialSnapshot: TrackerSnapshot;
};

// Same numbers we use everywhere as “safe fallback”
const FALLBACK: TrackerSnapshot = {
  priceUsd: 2.2177,
  totalAumUsd: 778_220_000,
  totalXrpLocked: 329_480_000,
};

function useTrackerSnapshot(initial: TrackerSnapshot): TrackerSnapshot {
  const [snapshot, setSnapshot] = useState<TrackerSnapshot>(initial);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_TRACKER_API_URL;
    if (!url) return;

    let cancelled = false;

    async function pull() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Tracker HTTP ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          setSnapshot({
            priceUsd: data.priceUsd ?? FALLBACK.priceUsd,
            totalAumUsd: data.totalAumUsd ?? FALLBACK.totalAumUsd,
            totalXrpLocked: data.totalXrpLocked ?? FALLBACK.totalXrpLocked,
          });
        }
      } catch (err) {
        console.error("Tracker client fetch failed:", err);
      }
    }

    // First pull + refresh every 60s
    pull();
    const timer = setInterval(pull, 60_000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return snapshot;
}

function formatUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function formatXrp(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B XRP`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M XRP`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K XRP`;
  return `${n.toLocaleString()} XRP`;
}

export default function TrackerClient({ initialSnapshot }: Props) {
  const live = useTrackerSnapshot(initialSnapshot);

  const totalXrpLockedLocal = etfData.reduce(
    (sum, etf) => sum + etf.xrpLocked,
    0
  );
  const totalAumUsdLocal = etfData.reduce((sum, etf) => sum + etf.aumUsd, 0);

  const targetXrp = 1_000_000_000;
  const leader = etfData.reduce(
    (top, etf) => (etf.xrpLocked > (top?.xrpLocked ?? 0) ? etf : top),
    etfData[0]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Hero stats wired to LIVE SNAPSHOT */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-950/80 border border-emerald-500/40 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            XRP PRICE (USD)
          </p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">
            ${live.priceUsd.toFixed(4)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950/80 border border-emerald-500/40 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            TOTAL ETF AUM
          </p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">
            {formatUsd(live.totalAumUsd)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950/80 border border-emerald-500/40 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            XRP LOCKED IN ETFS
          </p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">
            {formatXrp(live.totalXrpLocked)}
          </p>
        </div>
      </section>

      {/* Your existing chart + table etc below – unchanged */}
      {/* Example of your Recharts demo slot */}
      <section className="rounded-2xl border border-emerald-500/40 bg-slate-950/80 p-4">
        <h2 className="text-sm font-medium text-slate-200 mb-2">
          XRP ETF Flow & Price – War Room View
        </h2>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { day: "Mon", value: 10 },
                { day: "Tue", value: 30 },
                { day: "Wed", value: 45 },
                { day: "Thu", value: 60 },
                { day: "Fri", value: 80 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Your ETF table section using etfData stays as you already had it */}
    </div>
  );
}
