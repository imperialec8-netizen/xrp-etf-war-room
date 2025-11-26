// app/etf-data.ts

export interface Etf {
  id: string;
  provider: string;
  fundName: string;
  ticker: string;
  category: string;
  status: string;
  exchange: string;
  country: string;
  navUsd: number;
  marketPriceUsd: number;
  premiumDiscountPercent: number;
  sharesOutstanding: number;
  xrpPerShare: number;
  xrpLocked: number;
  aumUsd: number;
  dailyInflowUsd: number;
  dailyInflowXrp: number;
  weeklyInflowUsd: number;
  weeklyInflowXrp: number;
  rolling30dFlowUsd: number;
  rolling30dFlowXrp: number;
  liquidityScore: number;
  riskBand: string;
  vaults: {
    label: string;
    network: string;
    address: string;
    verifiedBalanceXrp: number;
    explorerUrl: string;
  }[];
}

export const etfData: Etf[] = [
  {
    id: "bitwise-xrpx",
    provider: "Bitwise",
    fundName: "Bitwise XRP Trust",
    ticker: "XRPL",
    category: "Spot",
    status: "Active",
    exchange: "NYSE Arca",
    country: "US",
    navUsd: 33.15,
    marketPriceUsd: 33.45,
    premiumDiscountPercent: 0.9,
    sharesOutstanding: 6150000,
    xrpPerShare: 10.1,
    xrpLocked: 62115000,
    aumUsd: 206979000,
    dailyInflowUsd: 3100000,
    dailyInflowXrp: 939394,
    weeklyInflowUsd: 18200000,
    weeklyInflowXrp: 5515151,
    rolling30dFlowUsd: 95500000,
    rolling30dFlowXrp: 28939394,
    liquidityScore: 87,
    riskBand: "Institutional Core",
    vaults: [
      {
        label: "Primary Custody Vault",
        network: "XRPL",
        address: "rBitwiseVault123456789ABCDEFG",
        verifiedBalanceXrp: 61000000,
        explorerUrl: "https://bithomp.com/explorer/rBitwiseVault123456789ABCDEFG",
      },
      {
        label: "Liquidity Buffer Wallet",
        network: "XRPL",
        address: "rBitwiseBuffer987654321ZYXWVUT",
        verifiedBalanceXrp: 1115000,
        explorerUrl: "https://bithomp.com/explorer/rBitwiseBuffer987654321ZYXWVUT",
      },
    ],
  },

  {
    id: "canary-xrp",
    provider: "Canary",
    fundName: "Canary XRP Spot ETF",
    ticker: "CXRPE",
    category: "Spot",
    status: "Active",
    exchange: "Cboe BZX",
    country: "US",
    navUsd: 24.95,
    marketPriceUsd: 24.88,
    premiumDiscountPercent: -0.28,
    sharesOutstanding: 3550000,
    xrpPerShare: 7.9,
    xrpLocked: 28045000,
    aumUsd: 82612750,
    dailyInflowUsd: 940000,
    dailyInflowXrp: 284848,
    weeklyInflowUsd: 6120000,
    weeklyInflowXrp: 1854545,
    rolling30dFlowUsd: 28800000,
    rolling30dFlowXrp: 8727273,
    liquidityScore: 71,
    riskBand: "Growth Satellite",
    vaults: [
      {
        label: "Primary Custody Vault",
        network: "XRPL",
        address: "rCanaryVaultABCDEFG987654321",
        verifiedBalanceXrp: 27000000,
        explorerUrl: "https://bithomp.com/explorer/rCanaryVaultABCDEFG987654321",
      },
    ],
  },
];