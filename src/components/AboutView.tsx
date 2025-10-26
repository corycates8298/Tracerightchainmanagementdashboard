import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Search, Brain, TrendingUp, Shield, Zap, Package, BarChart3 } from 'lucide-react';
import { AdvancedChartsShowcase } from './AdvancedChartsShowcase';

export function AboutView() {
  const [showCharts, setShowCharts] = useState(false);

  if (showCharts) {
    return <AdvancedChartsShowcase />;
  }

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Search className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900 text-4xl">TraceRight</h1>
            <p className="text-slate-600 mt-1">AI-Powered Supply Chain Intelligence</p>
          </div>
        </div>
      </div>

      <Card className="p-8 border-slate-200">
        <h2 className="text-slate-900 text-2xl mb-4">About TraceRight</h2>
        <p className="text-slate-700 mb-4">
          TraceRight is a comprehensive AI-powered supply chain management platform that provides end-to-end visibility,
          intelligent insights, and predictive analytics for modern logistics operations.
        </p>
        <p className="text-slate-700">
          Built with cutting-edge AI and machine learning capabilities, TraceRight transforms complex supply chain data
          into actionable intelligence, helping organizations optimize operations, reduce costs, and improve efficiency.
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-slate-900 mb-2">AI-Powered Insights</h3>
          <p className="text-sm text-slate-600">
            Advanced machine learning models predict demand, optimize inventory, and identify risks before they impact operations.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-slate-900 mb-2">End-to-End Traceability</h3>
          <p className="text-sm text-slate-600">
            Track every item from source to destination with complete visibility and real-time status updates.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-slate-900 mb-2">Predictive Analytics</h3>
          <p className="text-sm text-slate-600">
            Forecast future demand, optimize stock levels, and make data-driven decisions with AI forecasting.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-slate-900 mb-2">Compliance & Governance</h3>
          <p className="text-sm text-slate-600">
            AI-powered document search across SOPs, contracts, and regulations ensures compliance and quick answers.
          </p>
        </Card>
      </div>

      <Card className="p-6 border-slate-200 bg-gradient-to-br from-slate-50 to-violet-50">
        <div className="text-center">
          <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Version 2.0.0
          </Badge>
          <h3 className="text-slate-900 mb-2">Technology Stack</h3>
          <p className="text-sm text-slate-600 mb-4">
            Built with Firebase, BigQuery, Vertex AI, and Genkit for enterprise-grade performance and scalability.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Firestore</Badge>
            <Badge variant="outline">BigQuery</Badge>
            <Badge variant="outline">Vertex AI</Badge>
            <Badge variant="outline">Genkit</Badge>
            <Badge variant="outline">Firebase Auth</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-blue-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-blue-900">Advanced Charts Gallery</h3>
            </div>
            <p className="text-sm text-blue-700">
              Explore 15+ professional chart types for comprehensive data visualization
            </p>
          </div>
          <Button
            onClick={() => setShowCharts(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Charts
          </Button>
        </div>
      </Card>
    </div>
  );
}
