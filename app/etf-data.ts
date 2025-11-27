// --- Live Tracker Override Constants ---
// These sync your War Room with the official XRP ETF Tracker stats.
// Update these anytime the official tracker changes its totals.

export const trackerXrpPriceUsd = 2.2260;            // Official: XRP price
export const trackerTotalAumUsd = 778_220_000;        // Official: $778.22M AUM
export const trackerTotalXrpLocked = 329_480_000;     // Official: 329.48M XRP locked


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

// NOTE: numbers are static “war room” values you can tweak anytime.
// Tickerd are set to match the XR* style you wanted.

export const etfData: Etf[] = [
  {
    id: "canary-capital",
    provider: "Canary Capital",
    fundName: "Canary XRP Spot ETF",
    ticker: "XRPC", // ✅ ticker fixed
    category: "Spot",
    status: "Active",
    exchange: "Cboe BZX",
    country: "US",

    navUsd: 26.40,
    marketPriceUsd: 26.52,
    premiumDiscountPercent: 0.45,

    sharesOutstanding: 5_745_000,
    xrpPerShare: 26.4,
    xrpLocked: 151_700_000, // matches bar chart leader
    aumUsd: 400_488_000,

    dailyInflowUsd: 7_800_000,
    dailyInflowXrp: 295_000,
    weeklyInflowUsd: 42_500_000,
    weeklyInflowXrp: 1_582_000,
    rolling30dFlowUsd: 205_000_000,
    rolling30dFlowXrp: 7_650_000,

    liquidityScore: 92,
    riskBand: "Institutional Core",

    vaults: [
      {
        label: "Primary Custody Vault",
        network: "XRPL",
        address: "rCanaryCapitalVault123456789ABCDEFG",
        verifiedBalanceXrp: 151_000_000,
        explorerUrl:
          "https://bithomp.com/explorer/rCanaryCapitalVault123456789ABCDEFG",
      },
    ],
  } as any,

  {
    id: "bitwise-xrpx",
    provider: "Bitwise",
    fundName: "Bitwise XRP Trust",
    ticker: "XRP", // ✅ ticker fixed
    category: "Spot",
    status: "Active",
    exchange: "NYSE Arca",
    country: "US",

    navUsd: 33.15,
    marketPriceUsd: 33.45,
    premiumDiscountPercent: 0.9,

    sharesOutstanding: 7_630_000,
    xrpPerShare: 10.1,
    xrpLocked: 77_100_000,
    aumUsd: 253_165_000,

    dailyInflowUsd: 4_200_000,
    dailyInflowXrp: 126_000,
    weeklyInflowUsd: 23_600_000,
    weeklyInflowXrp: 708_000,
    rolling30dFlowUsd: 110_000_000,
    rolling30dFlowXrp: 3_300_000,

    liquidityScore: 87,
    riskBand: "Institutional Core",

    vaults: [
      {
        label: "Primary Custody Vault",
        network: "XRPL",
        address: "rBitwiseVault123456789ABCDEFG",
        verifiedBalanceXrp: 75_000_000,
        explorerUrl:
          "https://bithomp.com/explorer/rBitwiseVault123456789ABCDEFG",
      },
    ],
  } as any,

  {
    id: "grayscale-xrp",
    provider: "Grayscale",
    fundName: "Grayscale XRP Trust",
    ticker: "GXRP",
    category: "Spot",
    status: "Active",
    exchange: "OTCQX",
    country: "US",

    navUsd: 18.30,
    marketPriceUsd: 18.10,
    premiumDiscountPercent: -1.1,

    sharesOutstanding: 1_972_000,
    xrpPerShare: 18.3,
    xrpLocked: 36_100_000,
    aumUsd: 329_676_000,

    dailyInflowUsd: 1_100_000,
    dailyInflowXrp: 60_000,
    weeklyInflowUsd: 6_200_000,
    weeklyInflowXrp: 340_000,
    rolling30dFlowUsd: 28_000_000,
    rolling30dFlowXrp: 1_540_000,

    liquidityScore: 74,
    riskBand: "Growth Satellite",

    vaults: [
      {
        label: "Primary Custody Vault",
        network: "XRPL",
        address: "rGrayscaleVaultABCDEFG987654321",
        verifiedBalanceXrp: 35_000_000,
        explorerUrl:
          "https://bithomp.com/explorer/rGrayscaleVaultABCDEFG987654321",
      },
    ],
  } as any,

  {
    id: "rex-osprey",
    provider: "REX-Osprey",
    fundName: "REX • Osprey XRP ETF",
    ticker: "XRPR",
    category: "Spot",
    status: "Active",
    exchange: "NYSE Arca",
    country: "US",

    navUsd: 21.90,
    marketPriceUsd: 21.85,
    premiumDiscountPercent: -0.2,

    sharesOutstanding: 1_485_000,
    xrpPerShare: 21.9,
    xrpLocked: 32_500_000,
    aumUsd: 325_000_000,

    dailyInflowUsd: 900_000,
    dailyInflowXrp: 41_000,
    weeklyInflowUsd: 4_800_000,
    weeklyInflowXrp: 220_000,
    rolling30dFlowUsd: 22_500_000,
    rolling30dFlowXrp: 1_050_000,

    liquidityScore: 69,
    riskBand: "Growth Satellite",

    vaults: [
      {
        label: "Primary Custody Vault",
        network: "XRPL",
        address: "rRexOspreyVaultABCDEFG987650000",
        verifiedBalanceXrp: 31_800_000,
        explorerUrl:
          "https://bithomp.com/explorer/rRexOspreyVaultABCDEFG987650000",
      },
    ],
  } as any,

  {
    id: "franklin-templeton",
    provider: "Franklin Templeton",
    fundName: "Franklin XRP ETF",
    ticker: "XRPZ",
    category: "Spot",
    status: "Active",
    exchange: "NYSE Arca",
    country: "US",

    navUsd: 20.10,
    marketPriceUsd: 20.05,
    premiumDiscountPercent: -0.25,

    sharesOutstanding: 1_593_000,
    xrpPerShare: 20.1,
    xrpLocked: 32_000_000,
    aumUsd: 322_000_000,

    dailyInflowUsd: 880_000,
    dailyInflowXrp: 44_000,
    weeklyInflowUsd: 4_500_000,
    weeklyInflowXrp: 220_000,
    rolling30dFlowUsd: 21_800_000,
    rolling30dFlowXrp: 1_050_000,

    liquidityScore: 68,
    riskBand: "Core Satellite",

    vaults: [
      {
        label: "Primary Custody Vault",
        network: "XRPL",
        address: "rFranklinVaultABCDEFG123450000",
        verifiedBalanceXrp: 31_400_000,
        explorerUrl:
          "https://bithomp.com/explorer/rFranklinVaultABCDEFG123450000",
      },
    ],
  } as any,
];