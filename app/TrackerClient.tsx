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

export default function TrackerClient({ initialSnapshot }: Props) {
  const [snapshot, setSnapshot] = useState<TrackerSnapshot>(initialSnapshot);

  // 🔄 Client-side refresh from /api/tracker
  useEffect(() => {
    const upstream = process.env.NEXT_PUBLIC_TRACKER_API_URL;
    if (!upstream) return;

    async function refresh() {
      try {
        const res = await fetch(upstream);
        if (!res.ok) throw new Error("Bad status");
        const data = await res.json();

        setSnapshot((prev) => ({
          priceUsd: data.priceUsd ?? prev.priceUsd,
          totalAumUsd: data.totalAumUsd ?? prev.totalAumUsd,
          totalXrpLocked: data.totalXrpLocked ?? prev.totalXrpLocked,
        }));
      } catch (err) {
        console.error("Tracker refresh failed", err);
        // keep previous snapshot
      }
    }

    // initial refresh + interval
    refresh();
    const id = setInterval(refresh, 60_000); // every 60s

    return () => clearInterval(id);
  }, []);

  const { priceUsd, totalAumUsd, totalXrpLocked } = snapshot;

  return (
    <div className="space-y-8">
      {/* 📊 HERO STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <HeroStat label="XRP Price (USD)" value={`$${priceUsd.toFixed(4)}`} />

        <HeroStat
          label="Total ETF AUM (USD)"
          value={formatUsd(totalAumUsd)}
        />

        <HeroStat
          label="XRP Locked in ETFs"
          value={formatNumber(totalXrpLocked)}
        />
      </div>

      {/* 📈 MAIN CHART (still using etfData) */}
      <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
        <h2 className="mb-4 text-lg font-medium">
          XRP ETF Flow & Price – War Room View
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={etfData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

// ------- Small helpers -------

function formatUsd(v: number) {
  return `$${v.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
}

function formatNumber(v: number) {
  return v.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

type HeroStatProps = {
  label: string;
  value: string;
};

function HeroStat({ label, value }: HeroStatProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-emerald-400">
        {value}
      </div>
    </div>
  );
}
