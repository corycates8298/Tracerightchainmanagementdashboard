import { useState } from 'react';
import { useFeatureFlags, FeatureFlags, CROWDFUNDING_TIERS, CrowdfundingTier } from './FeatureFlagsContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import {
  Settings,
  ToggleLeft,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Search,
  Power,
  PowerOff,
  Sparkles,
  Crown,
  Zap,
  Rocket,
  Star,
  TrendingUp,
  Filter
} from 'lucide-react';

export function FeatureFlagsManagerV2() {
  const {
    flags,
    currentTier,
    toggleFeature,
    enableAll,
    disableAll,
    resetFlags,
    exportConfig,
    importConfig,
    setTier,
    enableTier,
    getEnabledCount,
    getTotalCount,
    getFeaturesByCategory,
  } = useFeatureFlags();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const categories = getFeaturesByCategory();
  const totalFeatures = getTotalCount();
  const enabledFeatures = getEnabledCount();

  const handleExport = () => {
    const config = exportConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traceright-features-${Date.now()}.json`;
    a.click();
    toast.success('Configuration exported!');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = e.target?.result as string;
        importConfig(config);
        toast.success('Configuration imported!');
      } catch (error) {
        toast.error('Failed to import configuration');
      }
    };
    reader.readAsText(file);
  };

  const handleTierChange = (tier: CrowdfundingTier) => {
    enableTier(tier);
    toast.success(`Upgraded to ${CROWDFUNDING_TIERS[tier].name}!`, {
      description: `${CROWDFUNDING_TIERS[tier].features.length} features enabled`,
    });
  };

  const getTierIcon = (tier: CrowdfundingTier) => {
    switch (tier) {
      case 'free': return <Sparkles className="w-5 h-5" />;
      case 'starter': return <Zap className="w-5 h-5" />;
      case 'professional': return <TrendingUp className="w-5 h-5" />;
      case 'enterprise': return <Crown className="w-5 h-5" />;
      case 'ultimate': return <Rocket className="w-5 h-5" />;
    }
  };

  const getTierColor = (tier: CrowdfundingTier) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'starter': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'professional': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'enterprise': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'ultimate': return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-yellow-300';
    }
  };

  const filteredFeatures = () => {
    let features: (keyof FeatureFlags)[] = [];
    
    if (selectedCategory === 'all') {
      features = Object.keys(flags) as (keyof FeatureFlags)[];
    } else {
      features = categories[selectedCategory] || [];
    }

    if (searchQuery) {
      features = features.filter(feature =>
        feature.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return features;
  };

  const formatFeatureName = (feature: string): string => {
    return feature
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900 text-2xl">Feature Flags Manager</h2>
              <p className="text-slate-600">Crowdfunding Edition - Control every feature</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-violet-600 text-white px-4 py-2">
              {enabledFeatures} / {totalFeatures} Features
            </Badge>
          </div>
        </div>

        {/* Current Tier */}
        <div className={`p-4 rounded-lg border-2 ${getTierColor(currentTier)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getTierIcon(currentTier)}
              <div>
                <div className="font-semibold">Current Tier: {CROWDFUNDING_TIERS[currentTier].name}</div>
                <div className="text-sm opacity-80">
                  ${CROWDFUNDING_TIERS[currentTier].price}/month - {CROWDFUNDING_TIERS[currentTier].features.length} features
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowUpgradeModal(true)}
              variant="outline"
              className="border-current"
            >
              <Crown className="w-4 h-4 mr-2" />
              Change Tier
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 text-lg">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={enableAll}
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <Power className="w-4 h-4 mr-2" />
            Enable All
          </Button>
          <Button
            onClick={disableAll}
            variant="outline"
            className="border-red-200 text-red-700 hover:bg-red-50"
          >
            <PowerOff className="w-4 h-4 mr-2" />
            Disable All
          </Button>
          <Button
            onClick={resetFlags}
            variant="outline"
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <label htmlFor="import-config">
            <Button variant="outline" asChild className="w-full cursor-pointer">
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </span>
            </Button>
          </label>
          <input
            id="import-config"
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          className="w-full mt-3 border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Configuration
        </Button>
      </Card>

      {/* Search and Filter */}
      <Card className="p-6 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search features..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="all">All Categories</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category} ({categories[category].length})
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Feature Categories */}
      <div className="space-y-4">
        {selectedCategory === 'all' ? (
          Object.entries(categories).map(([category, features]) => (
            <Card key={category} className="border-slate-200">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-900 font-semibold">{category}</h3>
                  <Badge variant="outline">{features.length} features</Badge>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {features
                  .filter(feature =>
                    !searchQuery ||
                    feature.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          {flags[feature] ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-slate-900 text-sm font-medium">
                            {formatFeatureName(feature)}
                          </div>
                          <div className="text-xs text-slate-500">{feature}</div>
                        </div>
                      </div>
                      <Switch
                        checked={flags[feature]}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                    </div>
                  ))}
              </div>
            </Card>
          ))
        ) : (
          <Card className="border-slate-200">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-slate-900 font-semibold">{selectedCategory}</h3>
            </div>
            <div className="p-4 space-y-2">
              {filteredFeatures().map((feature) => (
                <div
                  key={feature}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {flags[feature] ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-400" />
                    )}
                    <div className="flex-1">
                      <div className="text-slate-900 text-sm font-medium">
                        {formatFeatureName(feature)}
                      </div>
                      <div className="text-xs text-slate-500">{feature}</div>
                    </div>
                  </div>
                  <Switch
                    checked={flags[feature]}
                    onCheckedChange={() => toggleFeature(feature)}
                  />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Tier Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900 text-2xl font-semibold">Choose Your Tier</h3>
                <Button
                  onClick={() => setShowUpgradeModal(false)}
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
              <p className="text-slate-600 mt-2">
                Select a crowdfunding tier to unlock features
              </p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(CROWDFUNDING_TIERS) as CrowdfundingTier[]).map((tier) => {
                const config = CROWDFUNDING_TIERS[tier];
                const isCurrent = tier === currentTier;
                
                return (
                  <Card
                    key={tier}
                    className={`p-6 cursor-pointer transition-all ${
                      isCurrent
                        ? 'border-2 border-violet-500 shadow-lg'
                        : 'border-slate-200 hover:border-violet-300 hover:shadow'
                    }`}
                    onClick={() => !isCurrent && handleTierChange(tier)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {getTierIcon(tier)}
                      <div>
                        <div className="text-slate-900 font-semibold">
                          {config.name}
                        </div>
                        <div className="text-2xl font-bold text-violet-600">
                          ${config.price}
                          <span className="text-sm text-slate-500">/mo</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-slate-600">
                        <strong>{config.features.length}</strong> features included
                      </div>
                      {isCurrent && (
                        <Badge className="bg-violet-600 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Current Plan
                        </Badge>
                      )}
                    </div>
                    {!isCurrent && (
                      <Button
                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTierChange(tier);
                          setShowUpgradeModal(false);
                        }}
                      >
                        Select {config.name}
                      </Button>
                    )}
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
