// app/page.tsx
import { etfData } from "./etf-data";

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

export default function Home() {
  const totalXrpLocked = etfData.reduce((sum, etf: any) => sum + etf.xrpLocked, 0);
  const totalAumUsd = etfData.reduce((sum, etf: any) => sum + etf.aumUsd, 0);
  const total30dXrp = etfData.reduce(
    (sum, etf: any) => sum + etf.rolling30dFlowXrp,
    0
  );

// 1B XRP target + top ETF leader
const targetXrp = 1_000_000_000;

const leader: any = etfData.reduce(
  (top: any, etf: any) => (etf.xrpLocked > (top?.xrpLocked ?? 0) ? etf : top),
  etfData[0]
);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-emerald-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-emerald-400/70">
              VanQish Intelligence Division
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-emerald-300 drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]">
              XRP ETF War Room
            </h1>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Live institutional XRP accumulation snapshot. Focus:{" "}
              <span className="text-emerald-300 font-medium">
                float compression, supply drain, and vault concentration
              </span>{" "}
              across spot ETFs.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 px-4 py-3 text-xs md:text-sm shadow-[0_0_40px_rgba(34,197,94,0.35)]">
            <p className="font-mono text-emerald-300">
              JT CREED • ZEROZULUX COMMAND
            </p>
            <p className="text-slate-400 mt-1">
              Mode: <span className="text-emerald-300 font-semibold">ETF Float Collapse</span>
            </p>
            <p className="text-slate-500">
              Data source: <span className="text-slate-300">VanQish-WarRoom-v2 (static)</span>
            </p>
          </div>
        </header>

        {/* Stat cards */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/70 px-4 py-3 shadow-[0_0_30px_rgba(34,197,94,0.28)]">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">
              Total XRP Locked in ETFs
            </p>

          <p className="mt-2 text-xl md:text-2xl font-semibold text-emerald-300">
  {formatXrp(totalXrpLocked)}
</p>

<p className="mt-1 text-[0.7rem] text-slate-500">
  These tokens are effectively{" "}
  <span className="text-emerald-300 font-medium">off retail float</span>.
</p>

<p className="mt-1 text-[0.65rem] text-slate-500">
  Leader:{" "}
  <span className="text-emerald-300 font-medium">{leader?.provider}</span>
  {" • "}
  Target:{" "}
  <span className="text-emerald-300 font-medium">
    {formatXrp(targetXrp)}
  </span>
</p>



          <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/70 px-4 py-3">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">
              30-Day XRP Absorbed
            </p>
            <p className="mt-2 text-xl md:text-2xl font-semibold text-emerald-200">
              {formatXrp(total30dXrp)}
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              Rolling ETF accumulation. Rising numbers ={" "}
              <span className="text-emerald-300 font-medium">
                approaching supply shock
              </span>
              .
            </p>
          </div>
        </section>

        {/* Table */}
        <section className="rounded-3xl border border-emerald-500/30 bg-slate-950/80 shadow-[0_0_55px_rgba(34,197,94,0.3)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-950">
            <div>
              <p className="text-xs font-mono text-emerald-300">ETF GRID • LIVE SNAPSHOT</p>
              <p className="text-[0.7rem] text-slate-400">
                Each row = one institutional vault siphoning XRP off the open market.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/80 text-[0.7rem] uppercase tracking-wide text-slate-400 border-b border-emerald-500/20">
                <tr>
                  <th className="px-4 py-2 text-left">Fund</th>
                  <th className="px-4 py-2 text-left">Ticker</th>
                  <th className="px-4 py-2 text-right">XRP Locked</th>
                  <th className="px-4 py-2 text-right">AUM</th>
                  <th className="px-4 py-2 text-right">30d Flow XRP</th>
                  <th className="px-4 py-2 text-right">Premium</th>
                  <th className="px-4 py-2 text-left">Risk Band</th>
                  <th className="px-4 py-2 text-left">Primary Vault</th>
                </tr>
              </thead>
              <tbody>
                {etfData.map((etf: any) => {
                  const isPremiumPositive = etf.premiumDiscountPercent > 0;
                  return (
                    <tr
                      key={etf.id}
                      className="border-b border-slate-800/70 hover:bg-emerald-500/5 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-100">{etf.provider}</span>
                          <span className="text-xs text-slate-500">{etf.fundName}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-slate-950/70 px-2 py-0.5 text-[0.7rem] font-mono text-emerald-300">
                          {etf.ticker}
                        </span>
                        <div className="mt-1 text-[0.65rem] text-slate-500">{etf.exchange}</div>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="font-mono text-emerald-200">{formatXrp(etf.xrpLocked)}</div>
                        <div className="text-[0.65rem] text-slate-500">
                          {etf.xrpPerShare.toFixed(2)} XRP / share
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="font-mono text-slate-100">{formatUsd(etf.aumUsd)}</div>
                        <div className="text-[0.65rem] text-slate-500">
                          {etf.sharesOutstanding.toLocaleString()} shares
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="font-mono text-emerald-200">
                          {formatXrp(etf.rolling30dFlowXrp)}
                        </div>
                        <div className="text-[0.65rem] text-slate-500">
                          {formatUsd(etf.rolling30dFlowUsd)} in 30d
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div
                          className={`font-mono ${
                            isPremiumPositive ? "text-emerald-300" : "text-rose-300"
                          }`}
                        >
                          {etf.premiumDiscountPercent.toFixed(2)}%
                        </div>

                        <div className="text-[0.65rem] text-slate-500">
                          {isPremiumPositive ? "APs chasing shares" : "discount / arb"}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs text-emerald-300">{etf.riskBand}</div>
                        <div className="text-[0.65rem] text-slate-500">
                          Liquidity score: {etf.liquidityScore}/100
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        {etf.vaults && etf.vaults[0] && (
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-200">{etf.vaults[0].label}</span>
                            <a
                              href={etf.vaults[0].explorerUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[0.65rem] text-emerald-300 underline underline-offset-2 hover:text-emerald-200"
                            >
                              View on XRPL explorer
                            </a>
                            <span className="mt-0.5 text-[0.65rem] text-slate-500">
                              {formatXrp(etf.vaults[0].verifiedBalanceXrp)}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-2 border-t border-emerald-500/20 text-[0.7rem] text-slate-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p>
            JT CREED • <span className="text-emerald-300">ZeroZuluX • Delta Operator ETF Watch</span>
          </p>
          <p className="text-slate-500">
            Phase 1: Static tracker. Phase 2: wired to live API + alert system.
          </p>
        </footer>
      </div>
    </main>
  );
}
