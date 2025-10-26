import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useTheme } from './ThemeContext';
import {
  WaterfallChart,
  TreemapChart,
  ScatterPlot,
  RadarChartComponent,
  FunnelChart,
  CombinationChart,
  StackedAreaChart,
  GaugeChart,
  BulletChart,
  HeatmapChart,
  sampleWaterfallData,
  sampleTreemapData,
  sampleScatterData,
  sampleRadarData,
  sampleFunnelData,
  sampleCombinationData,
  sampleStackedAreaData,
  sampleHeatmapData
} from './AdvancedChartLibrary';

export function AdvancedChartsShowcase() {
  const { gradientClass, fontClass } = useTheme();

  return (
    <div className={`p-8 space-y-6 ${fontClass}`}>
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Advanced Charts Gallery</h1>
        <p className="text-slate-600 mt-1">
          15+ chart types for comprehensive data visualization
        </p>
      </div>

      {/* Chart Categories */}
      <div className="space-y-8">
        {/* Financial & Variance Analysis */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-slate-900">Financial & Variance Analysis</h2>
            <Badge variant="outline">2 charts</Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <WaterfallChart 
              data={sampleWaterfallData}
              title="Revenue Waterfall Analysis"
            />
            <BulletChart
              actual={85000}
              target={100000}
              title="Sales Target Progress"
            />
          </div>
        </div>

        {/* Hierarchical & Distribution */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-slate-900">Hierarchical & Distribution</h2>
            <Badge variant="outline">2 charts</Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <TreemapChart
              data={sampleTreemapData}
              title="Sales by Category"
            />
            <FunnelChart
              data={sampleFunnelData}
              title="Conversion Funnel"
            />
          </div>
        </div>

        {/* Correlation & Multi-Dimensional */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-slate-900">Correlation & Multi-Dimensional</h2>
            <Badge variant="outline">2 charts</Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ScatterPlot
              data={sampleScatterData}
              title="Performance Correlation"
            />
            <RadarChartComponent
              data={sampleRadarData}
              title="Supplier Performance Metrics"
            />
          </div>
        </div>

        {/* Time Series & Trends */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-slate-900">Time Series & Trends</h2>
            <Badge variant="outline">2 charts</Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <CombinationChart
              data={sampleCombinationData}
              title="Revenue & Growth Rate"
            />
            <StackedAreaChart
              data={sampleStackedAreaData}
              title="Product Revenue Mix Over Time"
            />
          </div>
        </div>

        {/* KPIs & Performance */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-slate-900">KPIs & Performance</h2>
            <Badge variant="outline">2 charts</Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GaugeChart
              value={82}
              max={100}
              title="Overall Performance Score"
              label="Score"
            />
            <HeatmapChart
              data={sampleHeatmapData}
              title="Activity Heatmap"
            />
          </div>
        </div>
      </div>

      {/* Chart Selection Guide */}
      <Card className="p-6 border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <h3 className="text-blue-900 mb-4">📊 Chart Selection Guide</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-blue-900 mb-2">Show Trends Over Time:</div>
            <ul className="text-blue-700 space-y-1">
              <li>• Line Charts</li>
              <li>• Area Charts (stacked/unstacked)</li>
              <li>• Combination Charts</li>
            </ul>
          </div>
          <div>
            <div className="text-blue-900 mb-2">Compare Categories:</div>
            <ul className="text-blue-700 space-y-1">
              <li>• Bar/Column Charts</li>
              <li>• Treemaps</li>
              <li>• Bullet Charts</li>
            </ul>
          </div>
          <div>
            <div className="text-blue-900 mb-2">Show Composition:</div>
            <ul className="text-blue-700 space-y-1">
              <li>• Pie/Donut Charts</li>
              <li>• Stacked Area</li>
              <li>• Waterfall Charts</li>
            </ul>
          </div>
          <div>
            <div className="text-blue-900 mb-2">Reveal Correlations:</div>
            <ul className="text-blue-700 space-y-1">
              <li>• Scatter Plots</li>
              <li>• Heatmaps</li>
              <li>• Combination Charts</li>
            </ul>
          </div>
          <div>
            <div className="text-blue-900 mb-2">Track Performance:</div>
            <ul className="text-blue-700 space-y-1">
              <li>• Gauge Charts</li>
              <li>• Bullet Charts</li>
              <li>• Progress Bars</li>
            </ul>
          </div>
          <div>
            <div className="text-blue-900 mb-2">Show Processes:</div>
            <ul className="text-blue-700 space-y-1">
              <li>• Funnel Charts</li>
              <li>• Waterfall Charts</li>
              <li>• Sankey Diagrams</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6 border-green-200 bg-green-50">
        <h3 className="text-green-900 mb-3">✨ Visualization Best Practices</h3>
        <ul className="text-sm text-green-700 space-y-2">
          <li>• <strong>Choose the right chart:</strong> Match visualization to your data story</li>
          <li>• <strong>Keep it simple:</strong> Avoid cluttering with too many data series</li>
          <li>• <strong>Use color strategically:</strong> Highlight important data, maintain consistency</li>
          <li>• <strong>Label clearly:</strong> Include titles, legends, and axis labels</li>
          <li>• <strong>Consider your audience:</strong> Executive summary vs. detailed analysis</li>
          <li>• <strong>Test responsiveness:</strong> Ensure charts work on all screen sizes</li>
        </ul>
      </Card>
    </div>
  );
}
