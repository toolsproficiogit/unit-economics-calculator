export interface MarketingInputs {
  searchVolume: number | null;
  ctr: number | null; // as percentage
  cpc: number | null;
  cvr: number | null; // as percentage
  aov: number | null;
  margin: number | null; // as percentage
}

export interface MarketingOutputs {
  clicks: number;
  conversions: number;
  revenue: number;
  costs: number;
  cpa: number;
  pno: number; // as percentage
  profit: number | null;
}