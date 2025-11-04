import React, { useState, useEffect, useRef } from 'react';
import type { MarketingInputs, MarketingOutputs } from './types';
import InputCard from './components/InputCard';
import OutputCard from './components/OutputCard';
import Rain from './components/Rain';

// --- Helper Functions ---
const formatCurrency = (value: number, currency: string) => {
  const locales: { [key: string]: string } = {
    'CZK': 'cs-CZ',
    'EUR': 'de-DE', // Using a common locale for Euro formatting
    'USD': 'en-US',
  };
  return new Intl.NumberFormat(locales[currency] || 'cs-CZ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value: number) => {
  return `${value.toFixed(2).replace('.', ',')} %`;
};

const formatNumber = (value: number, precision = 0) => {
  return new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
};


// --- SVG Icons ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
const PointerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor"><path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/></svg>;
const CurrencyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.162-.325zM11.567 9.182v-1.698c.22.07.412.164.567.267a2.5 2.5 0 00-1.134 1.431z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.879 3.197A1 1 0 008.25 9.5h3.5a1 1 0 00.93-1.216A4.5 4.5 0 0011 5.092V5zM10 13a1 1 0 100 2 1 1 0 000-2zm-2.5-1.5a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zm5-4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm5 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm3-7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" /><path fillRule="evenodd" d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm11 2a1 1 0 01-1 1H4a1 1 0 110-2h8a1 1 0 011 1z" clipRule="evenodd" /></svg>;
const ShoppingBagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-2 9A1 1 0 003 18h14a1 1 0 00.994-1.11l-2-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z" clipRule="evenodd" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>;
const CalculatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zM4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V7a1 1 0 00-1-1H6zm1 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm-1 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H6zm5-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-1 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1h-1z" clipRule="evenodd" /></svg>;
const PercentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 7a1 1 0 100-2 1 1 0 000 2zm7 5a1 1 0 11-2 0 1 1 0 012 0zm-5-3a1 1 0 011.414 0l-4 4a1 1 0 11-1.414-1.414l4-4z" clipRule="evenodd" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h12v4a2 2 0 002-2V6a2 2 0 00-2-2H4z" clipRule="evenodd" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>;


const App: React.FC = () => {
  const [inputs, setInputs] = useState<MarketingInputs>({
    searchVolume: 1000,
    ctr: 10,
    cpc: 5,
    cvr: 2,
    aov: 1200,
    margin: 30,
  });
  const [currency, setCurrency] = useState('CZK');
  const [isRaining, setIsRaining] = useState(false);
  const rainTimeoutRef = useRef<number | undefined>();

  const handleInputChange = (field: keyof MarketingInputs) => (value: number | null) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateOutputs = (inputs: MarketingInputs): MarketingOutputs => {
    // FIX: Although the original error was "Expected 1 arguments, but got 0", a clear issue was that `MarketingInputs` type didn't allow nulls, but the UI could produce them.
    // This could lead to runtime errors during calculation. By allowing nulls in the type and handling them here, the application becomes more robust.
    const clicks = (inputs.searchVolume ?? 0) * ((inputs.ctr ?? 0) / 100);
    const conversions = clicks * ((inputs.cvr ?? 0) / 100);
    const revenue = conversions * (inputs.aov ?? 0);
    const costs = clicks * (inputs.cpc ?? 0);
    const cpa = costs / (conversions || 1);
    const pno = (costs / (revenue || 1)) * 100;
    const profit = inputs.margin && inputs.margin > 0
      ? (revenue * (inputs.margin / 100)) - costs
      : null;

    return { clicks, conversions, revenue, costs, cpa, pno, profit };
  };

  const triggerRain = () => {
    if (isRaining) return;

    setIsRaining(true);

    clearTimeout(rainTimeoutRef.current);

    rainTimeoutRef.current = window.setTimeout(() => {
      setIsRaining(false);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(rainTimeoutRef.current);
    };
  }, []);

  const outputs = calculateOutputs(inputs);

  return (
    <div className="min-h-screen bg-[#083028] text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <Rain isRaining={isRaining} />
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#ff4a22] tracking-tight">
          PPC Marketing Calculator
        </h1>
        <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
          Estimate your campaign's potential. Adjust the sliders and see the magic happen.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-end">
            <div className="inline-block relative">
                <select
                aria-label="Select Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="block appearance-none w-full bg-white/5 border border-white/20 text-white py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white/10 focus:border-[#ff4a22]"
                >
                <option value="CZK">CZK (Kč)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <InputCard id="searchVolume" label="Search Volume" value={inputs.searchVolume} onChange={handleInputChange('searchVolume')} min={0} max={100000000} sliderMax={100000} step={500} icon={<SearchIcon />} />
          <InputCard id="ctr" label="CTR" value={inputs.ctr} onChange={handleInputChange('ctr')} unit="%" min={0} max={100} step={0.1} icon={<PointerIcon />} />
          <InputCard id="cpc" label="CPC" value={inputs.cpc} onChange={handleInputChange('cpc')} unit={currency} min={0} max={500} step={0.5} icon={<CurrencyIcon />} />
          <InputCard id="cvr" label="CVR" value={inputs.cvr} onChange={handleInputChange('cvr')} unit="%" min={0} max={100} step={0.1} icon={<ChartBarIcon />} />
          <InputCard id="aov" label="AOV" value={inputs.aov} onChange={handleInputChange('aov')} unit={currency} min={0} max={10000} step={50} icon={<ShoppingBagIcon />} />
          <InputCard id="margin" label="Margin (Optional)" value={inputs.margin} onChange={handleInputChange('margin')} unit="%" min={0} max={100} step={1} icon={<PercentIcon />} />
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-2xl border border-[#ff4a22]/40">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#ff4a22]">Your Predicted Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <OutputCard label="Conversions" value={formatNumber(outputs.conversions, 0)} icon={<ShoppingBagIcon />} />
              <OutputCard label="Revenue" value={formatCurrency(outputs.revenue, currency)} icon={<CurrencyIcon />} />
              <OutputCard label="Costs" value={formatCurrency(outputs.costs, currency)} icon={<CalculatorIcon />} />
              <OutputCard label="PNO" value={formatPercent(outputs.pno)} icon={<ChartBarIcon />} />
              <OutputCard label="CPA" value={formatCurrency(outputs.cpa, currency)} icon={<UsersIcon />} />
              {outputs.profit !== null && (
                <OutputCard label="Profit" value={formatCurrency(outputs.profit, currency)} icon={<CashIcon />} />
              )}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={triggerRain}
            disabled={isRaining}
            className="bg-[#ff4a22] text-[#083028] font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#083028] focus:ring-[#ff4a22] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isRaining ? 'Making it rain...' : 'Do you want to make it rain?'}
          </button>
        </div>
      </main>
      
      <footer className="text-center mt-12 text-slate-400 text-sm">
        <p><span className="font-semibold text-[#ff4a22]">Maira Team</span> | Performance Marketing</p>
      </footer>
    </div>
  );
};

export default App;