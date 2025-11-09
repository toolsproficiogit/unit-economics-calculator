import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Info } from 'lucide-react'
import './App.css'

function App() {
  // Input states - Sales Information
  const [aov, setAov] = useState(1210)
  const [tax, setTax] = useState(21)
  const [returnRate, setReturnRate] = useState(10)
  const [otherCorrections, setOtherCorrections] = useState(0)
  
  // Input states - Costs
  const [grossMargin, setGrossMargin] = useState(30)
  const [shippingPerOrder, setShippingPerOrder] = useState(80)
  const [handlingPerOrder, setHandlingPerOrder] = useState(40)
  
  // Input states - Optional
  const [repeatOrderMultiplier, setRepeatOrderMultiplier] = useState(5)
  
  // Calculated states
  const [aovAdjusted, setAovAdjusted] = useState(0)
  const [avgProfit, setAvgProfit] = useState(0)
  const [adjustedProfit, setAdjustedProfit] = useState(0)
  const [breakEvenCPA, setBreakEvenCPA] = useState(0)
  const [breakEvenROAS, setBreakEvenROAS] = useState(0)
  
  // Calculate all values whenever inputs change
  useEffect(() => {
    // Formula 1: AOV (post tax and return)
    // Based on analysis, the formula appears to be: AOV * (1 - TAX/100) * (1 - ReturnRate/100) + OtherCorrections
    const adjusted = aov * (1 - tax / 100) * (1 - returnRate / 100) + otherCorrections
    setAovAdjusted(adjusted)
    
    // Formula 2: AVG Profit per order (before marketing costs)
    // AOV_adjusted * GrossMargin/100 - Shipping - Handling
    const profit = adjusted * (grossMargin / 100) - shippingPerOrder - handlingPerOrder
    setAvgProfit(profit)
    
    // Formula 3: Adjusted profit per order
    // AVG_Profit * (1 + RepeatOrderMultiplier/100)
    const adjProfit = profit * (1 + repeatOrderMultiplier / 100)
    setAdjustedProfit(adjProfit)
    
    // Formula 4: Break Even CPA
    // This is the AVG Profit per order (before marketing costs)
    setBreakEvenCPA(profit)
    
    // Formula 5: Break Even ROAS
    // (Original AOV / BreakEvenCPA) * 100
    const roas = profit > 0 ? (aov / profit) * 100 : 0
    setBreakEvenROAS(roas)
  }, [aov, tax, returnRate, otherCorrections, grossMargin, shippingPerOrder, handlingPerOrder, repeatOrderMultiplier])
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  const formatPercentage = (value) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-maira-teal py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-maira-white uppercase tracking-tight">
            Unit Economics Calculator
          </h1>
          <p className="text-maira-white/90 mt-2 text-lg">
            Calculate your breakeven ROAS and CPA
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sales Information Card */}
            <Card className="border-2 border-maira-teal">
              <CardHeader className="bg-maira-teal">
                <CardTitle className="text-maira-white text-2xl uppercase">Sales Information</CardTitle>
                <CardDescription className="text-maira-white/80">Enter your average order value and rates</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aov" className="text-maira-teal font-semibold flex items-center gap-2">
                      AOV (Kč)
                      <span className="text-xs text-gray-500 font-normal">(Average Order Value)</span>
                    </Label>
                    <Input
                      id="aov"
                      type="number"
                      value={aov}
                      onChange={(e) => setAov(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      className="border-2 focus:border-maira-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax" className="text-maira-teal font-semibold flex items-center gap-2">
                      TAX (%)
                      <span className="text-xs text-gray-500 font-normal">(Benchmark: 12-21%)</span>
                    </Label>
                    <Input
                      id="tax"
                      type="number"
                      value={tax}
                      onChange={(e) => setTax(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      className="border-2 focus:border-maira-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="returnRate" className="text-maira-teal font-semibold flex items-center gap-2">
                      Return Rate (%)
                      <span className="text-xs text-gray-500 font-normal">(Benchmark: 16.9%)</span>
                    </Label>
                    <Input
                      id="returnRate"
                      type="number"
                      value={returnRate}
                      onChange={(e) => setReturnRate(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      className="border-2 focus:border-maira-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otherCorrections" className="text-maira-teal font-semibold flex items-center gap-2">
                      Other Corrections (Kč)
                      <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                    </Label>
                    <Input
                      id="otherCorrections"
                      type="number"
                      value={otherCorrections}
                      onChange={(e) => setOtherCorrections(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      className="border-2 focus:border-maira-orange"
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t-2 border-maira-gray">
                  <div className="flex justify-between items-center bg-maira-gray p-4 rounded">
                    <span className="font-bold text-maira-teal">AOV (post tax and return)</span>
                    <span className="text-2xl font-bold text-maira-teal">{formatCurrency(aovAdjusted)} Kč</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Costs Card */}
            <Card className="border-2 border-maira-orange">
              <CardHeader className="bg-maira-orange">
                <CardTitle className="text-maira-white text-2xl uppercase">Costs</CardTitle>
                <CardDescription className="text-maira-white/80">Enter your cost structure</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grossMargin" className="text-maira-teal font-semibold flex items-center gap-2">
                      Gross Margin (%)
                      <span className="text-xs text-gray-500 font-normal">(Benchmark: 25-60%)</span>
                    </Label>
                    <Input
                      id="grossMargin"
                      type="number"
                      value={grossMargin}
                      onChange={(e) => setGrossMargin(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      className="border-2 focus:border-maira-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shipping" className="text-maira-teal font-semibold flex items-center gap-2">
                      Shipping per Order (Kč)
                      <span className="text-xs text-gray-500 font-normal">(Benchmark: 60-200 Kč)</span>
                    </Label>
                    <Input
                      id="shipping"
                      type="number"
                      value={shippingPerOrder}
                      onChange={(e) => setShippingPerOrder(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      className="border-2 focus:border-maira-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="handling" className="text-maira-teal font-semibold">
                      Handling per Order (Kč)
                    </Label>
                    <Input
                      id="handling"
                      type="number"
                      value={handlingPerOrder}
                      onChange={(e) => setHandlingPerOrder(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                      className="border-2 focus:border-maira-orange"
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t-2 border-maira-gray">
                  <div className="flex justify-between items-center bg-maira-gray p-4 rounded">
                    <span className="font-bold text-maira-teal">AVG Profit per Order (before marketing costs)</span>
                    <span className="text-2xl font-bold text-maira-teal">{formatCurrency(avgProfit)} Kč</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Optional Card */}
            <Card className="border-2 border-gray-300">
              <CardHeader className="bg-gray-100">
                <CardTitle className="text-maira-teal text-2xl uppercase">Optional</CardTitle>
                <CardDescription className="text-gray-600">Adjust for customer lifetime value</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repeatOrder" className="text-maira-teal font-semibold flex items-center gap-2">
                    Repeat Order Multiplier (last 12m) (%)
                    <Info className="w-4 h-4 text-gray-400" />
                  </Label>
                  <Input
                    id="repeatOrder"
                    type="number"
                    value={repeatOrderMultiplier}
                    onChange={(e) => setRepeatOrderMultiplier(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    className="border-2 focus:border-maira-orange"
                  />
                  <p className="text-xs text-gray-500">
                    This accounts for the additional value from repeat customers over the past 12 months
                  </p>
                </div>
                
                <div className="pt-4 border-t-2 border-maira-gray">
                  <div className="flex justify-between items-center bg-maira-gray p-4 rounded">
                    <span className="font-bold text-maira-teal">Adjusted Profit per Order</span>
                    <span className="text-2xl font-bold text-maira-teal">{formatCurrency(adjustedProfit)} Kč</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Output */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="border-4 border-maira-orange bg-gradient-to-br from-maira-orange to-orange-600">
                <CardHeader>
                  <CardTitle className="text-maira-white text-3xl uppercase text-center">Output</CardTitle>
                  <CardDescription className="text-maira-white/90 text-center">Your breakeven metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-maira-white rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Profit per Order</p>
                    <p className="text-sm text-gray-500 mb-1">(before marketing costs)</p>
                    <p className="text-4xl font-bold text-maira-teal">{formatCurrency(adjustedProfit)} Kč</p>
                  </div>
                  
                  <div className="bg-maira-white rounded-lg p-6 text-center border-4 border-maira-teal">
                    <p className="text-sm text-gray-600 mb-2">Break Even CPA</p>
                    <p className="text-sm text-gray-500 mb-1">(Cost Per Acquisition)</p>
                    <p className="text-5xl font-bold text-maira-orange">{formatCurrency(breakEvenCPA)} Kč</p>
                  </div>
                  
                  <div className="bg-maira-white rounded-lg p-6 text-center border-4 border-maira-teal">
                    <p className="text-sm text-gray-600 mb-2">Break Even ROAS</p>
                    <p className="text-sm text-gray-500 mb-1">(Return on Ad Spend)</p>
                    <p className="text-5xl font-bold text-maira-orange">{formatPercentage(breakEvenROAS)}%</p>
                  </div>
                  
                  <div className="bg-maira-teal/20 rounded-lg p-4 text-maira-white text-xs">
                    <p className="flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>
                        These metrics show the maximum CPA and minimum ROAS needed to break even on your marketing spend.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-maira-teal py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-maira-white text-sm">
            © 2025 Maira Team - Performance Marketing Without the BS
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

