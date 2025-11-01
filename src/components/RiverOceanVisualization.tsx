import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Waves, MapPin, Factory, Package, Truck, Store, Globe } from 'lucide-react';

export function RiverOceanVisualization() {
  const stages = [
    { 
      icon: <MapPin className="w-6 h-6" />, 
      label: 'SOURCING', 
      description: 'Raw materials, suppliers, certifications',
      color: 'from-blue-400 to-blue-500'
    },
    { 
      icon: <Factory className="w-6 h-6" />, 
      label: 'PRODUCTION', 
      description: 'Manufacturing, batching, quality control',
      color: 'from-green-400 to-green-500'
    },
    { 
      icon: <Package className="w-6 h-6" />, 
      label: 'DISTRIBUTION', 
      description: 'Warehousing, inventory, FIFO',
      color: 'from-yellow-400 to-yellow-500'
    },
    { 
      icon: <Truck className="w-6 h-6" />, 
      label: 'DELIVERY', 
      description: 'Logistics, carriers, tracking',
      color: 'from-orange-400 to-orange-500'
    },
    { 
      icon: <Store className="w-6 h-6" />, 
      label: 'CUSTOMER', 
      description: 'Retail, end-user, QR scanning',
      color: 'from-purple-400 to-purple-500'
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            The River & Ocean
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Traceability is the river flowing through the supply chain ocean
          </p>
        </div>
      </div>

      {/* River Section */}
      <div className="px-8 pb-8">
        <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
          {/* Title Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
              <Waves className="w-4 h-4 mr-2" />
              THE RIVER: TRACEABILITY
            </Badge>
          </div>

          {/* River Flow */}
          <div className="relative pt-16 pb-8">
            {/* Flowing River Path */}
            <div className="relative h-64 mb-8">
              {/* River SVG Path - Curved */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.6 }} />
                    <stop offset="25%" style={{ stopColor: '#34d399', stopOpacity: 0.6 }} />
                    <stop offset="50%" style={{ stopColor: '#fbbf24', stopOpacity: 0.6 }} />
                    <stop offset="75%" style={{ stopColor: '#fb923c', stopOpacity: 0.6 }} />
                    <stop offset="100%" style={{ stopColor: '#a78bfa', stopOpacity: 0.6 }} />
                  </linearGradient>
                </defs>
                
                {/* Main river path */}
                <path
                  d="M 0,100 Q 200,60 250,100 T 500,100 Q 700,140 750,100 T 1000,100"
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth="60"
                  opacity="0.8"
                />
                
                {/* River highlights */}
                <path
                  d="M 0,100 Q 200,60 250,100 T 500,100 Q 700,140 750,100 T 1000,100"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  opacity="0.3"
                />
              </svg>

              {/* Stage Markers on River */}
              {stages.map((stage, idx) => (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: `${(idx * 20) + 10}%`,
                    top: idx === 1 || idx === 3 ? '15%' : idx === 2 ? '60%' : '40%',
                  }}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-xl relative z-10 animate-pulse`}>
                    {stage.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Stage Labels Below River */}
            <div className="grid grid-cols-5 gap-4 mt-4">
              {stages.map((stage, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-semibold text-slate-900 mb-1">{stage.label}</div>
                  <div className="text-xs text-slate-600">{stage.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* River Description */}
          <div className="mt-6 p-4 bg-white/70 backdrop-blur rounded-lg border border-blue-200">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="text-blue-900">The River</strong> represents the clear, continuous flow of 
              traceability data. It begins at the source (raw materials/components) and flows through 
              every touchpoint—production, quality control, distribution, and delivery—until it reaches 
              the customer. Each stage adds data to the flow, creating complete transparency.
            </p>
          </div>
        </Card>
      </div>

      {/* Ocean Section */}
      <div className="px-8 pb-8">
        <Card className="p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 relative overflow-hidden">
          {/* Title Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-purple-600 text-white text-sm px-3 py-1">
              <Globe className="w-4 h-4 mr-2" />
              THE OCEAN: SUPPLY CHAIN
            </Badge>
          </div>

          {/* Ocean Waves Animation */}
          <div className="relative pt-16 pb-8">
            {/* Multiple Layers of Waves */}
            <div className="relative h-48 mb-6 overflow-hidden">
              {/* Wave Layer 1 */}
              <div className="absolute bottom-0 w-full h-32">
                <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                  <path
                    d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z"
                    fill="rgba(147, 51, 234, 0.3)"
                  />
                </svg>
              </div>
              
              {/* Wave Layer 2 */}
              <div className="absolute bottom-0 w-full h-24">
                <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                  <path
                    d="M0,60 Q200,30 400,60 T800,60 Q1000,30 1200,60 L1200,100 L0,100 Z"
                    fill="rgba(139, 92, 246, 0.5)"
                  />
                </svg>
              </div>
              
              {/* Wave Layer 3 */}
              <div className="absolute bottom-0 w-full h-16">
                <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                  <path
                    d="M0,70 Q150,40 300,70 T600,70 Q750,40 900,70 T1200,70 L1200,100 L0,100 Z"
                    fill="rgba(124, 58, 237, 0.7)"
                  />
                </svg>
              </div>

              {/* Floating Elements (representing different aspects of supply chain) */}
              <div className="absolute inset-0 flex items-center justify-around px-8">
                {[
                  { label: 'Suppliers', icon: '🏭' },
                  { label: 'Logistics', icon: '🚚' },
                  { label: 'Warehouses', icon: '📦' },
                  { label: 'Retailers', icon: '🏪' },
                  { label: 'Customers', icon: '👥' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center"
                    style={{
                      animation: `float ${3 + idx * 0.5}s ease-in-out infinite`,
                      animationDelay: `${idx * 0.2}s`,
                    }}
                  >
                    <div className="text-3xl mb-1">{item.icon}</div>
                    <div className="text-xs font-medium text-purple-900 bg-white/70 px-2 py-1 rounded">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ocean Description */}
            <div className="mt-6 p-4 bg-white/70 backdrop-blur rounded-lg border border-purple-200">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-purple-900">The Ocean</strong> represents the vast, interconnected 
                supply chain ecosystem. It contains many rivers (traceability flows) from different suppliers, 
                manufacturers, and distributors. The ocean is deep and complex, with global trade currents, 
                regulations, demand patterns, and logistics networks. The health of the ocean depends on the 
                clarity of the rivers flowing into it.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Connection Section */}
      <div className="px-8 pb-8">
        <Card className="p-6 border-2 border-violet-200 bg-gradient-to-r from-blue-50 via-purple-50 to-violet-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Waves className="w-8 h-8 text-blue-600" />
              <span className="text-2xl">→</span>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                The Connection
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Traceability (the river)</strong> provides the clarity and direction needed to 
                navigate the <strong>supply chain (the ocean)</strong>. Multiple traceability rivers 
                from different sources feed into the supply chain ocean, creating a transparent, 
                navigable global network. Universal Trace Cloud maps both—giving you complete visibility 
                from source to customer across all industries.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
