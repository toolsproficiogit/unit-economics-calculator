# Unit Economics Calculator

A professional, branded one-page web application that helps marketing agencies and their clients calculate breakeven ROAS (Return on Ad Spend) and CPA (Cost Per Acquisition) based on unit economics metrics.

## Overview

This calculator is designed for the Maira Team marketing agency to provide value to their clients by helping them understand their performance marketing metrics. It automatically calculates key breakeven metrics based on average order value, costs, and other business parameters.

## Features

### Real-Time Calculations
- **Instant Updates**: All calculations update in real-time as you input your data
- **No Manual Calculation**: Automatically computes adjusted AOV, profit margins, and breakeven metrics
- **Industry Benchmarks**: Helpful benchmark ranges displayed for key metrics

### Key Metrics Calculated
1. **AOV (post tax and return)**: Adjusted average order value after accounting for taxes and returns
2. **Average Profit per Order**: Profit before marketing costs
3. **Adjusted Profit per Order**: Profit including repeat customer value
4. **Break Even CPA**: Maximum cost per acquisition to break even
5. **Break Even ROAS**: Minimum return on ad spend needed to break even

### Professional Design
- **Maira Team Branding**: Fully branded with agency colors (#083027 teal, #ff4a21 orange)
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI**: Modern card-based design with clear visual hierarchy
- **Accessible**: Proper labels, tooltips, and helpful descriptions

## Input Fields

### Sales Information
- **AOV (Kč)**: Average Order Value - the average amount customers spend per order
- **TAX (%)**: Tax rate applied to orders (Benchmark: 12-21%)
- **Return Rate (%)**: Percentage of orders that are returned (Benchmark: 16.9%)
- **Other Corrections (Kč)**: Optional adjustments to AOV

### Costs
- **Gross Margin (%)**: Profit margin on products (Benchmark: 25-60%)
- **Shipping per Order (Kč)**: Cost of shipping per order (Benchmark: 60-200 Kč)
- **Handling per Order (Kč)**: Processing and handling costs per order

### Optional
- **Repeat Order Multiplier (%)**: Additional value from repeat customers over 12 months

## Calculation Formulas

The calculator uses the following formulas based on standard unit economics principles:

```javascript
// 1. AOV (post tax and return)
aovAdjusted = aov * (1 - tax/100) * (1 - returnRate/100) + otherCorrections

// 2. Average Profit per Order (before marketing costs)
avgProfit = aovAdjusted * (grossMargin/100) - shippingPerOrder - handlingPerOrder

// 3. Adjusted Profit per Order
adjustedProfit = avgProfit * (1 + repeatOrderMultiplier/100)

// 4. Break Even CPA
breakEvenCPA = avgProfit

// 5. Break Even ROAS
breakEvenROAS = (originalAOV / breakEvenCPA) * 100
```

## Technology Stack

- **React 18**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Lucide Icons**: Beautiful icon set

## Development

### Prerequisites
- Node.js 22.13.0 or higher
- pnpm package manager

### Installation

```bash
cd unit-economics-calculator
pnpm install
```

### Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
pnpm run build
```

The production-ready files will be generated in the `dist/` directory.

### Preview Production Build

```bash
pnpm run preview
```

## Deployment

The calculator can be deployed to any static hosting service:

1. **Build the project**: `pnpm run build`
2. **Deploy the `dist/` folder** to your hosting service of choice:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Any static file server

## Customization

### Brand Colors

The brand colors are defined in `src/App.css`:

```css
--maira-teal: #083027;
--maira-orange: #ff4a21;
--maira-white: #ffffff;
--maira-gray: #e6e6e6;
```

To customize for a different brand, update these CSS variables.

### Default Values

Default input values can be modified in `src/App.jsx` in the `useState` declarations:

```javascript
const [aov, setAov] = useState(1210)
const [tax, setTax] = useState(21)
// ... etc
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Maira Team - Performance Marketing Without the BS

## Support

For questions or issues, please contact the Maira Team.

