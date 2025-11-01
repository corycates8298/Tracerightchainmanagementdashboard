import { useState } from 'react';
import { Search, Filter, X, Calendar, Tag, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';

export interface FilterOption {
  id: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'status';
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
}

interface SmartFilterProps {
  filters?: FilterOption[];
  options?: FilterOption[]; // Alias for filters
  onFilterChange: (filters: Record<string, any>) => void;
  placeholder?: string;
  className?: string;
  resultCount?: number; // Optional result count display
}

export function SmartFilter({
  filters: filtersProp,
  options: optionsProp,
  onFilterChange,
  placeholder = 'Search...',
  className = '',
  resultCount,
}: SmartFilterProps) {
  // Accept either 'filters' or 'options' prop, with fallback to empty array
  const filters = filtersProp || optionsProp || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const newFilters = { ...activeFilters, search: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = { ...activeFilters, [filterId]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const removeFilter = (filterId: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterId];
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAll = () => {
    setSearchQuery('');
    setActiveFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    key => key !== 'search' && activeFilters[key]
  ).length;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-violet-600 text-white h-5 min-w-[20px] px-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-slate-900">Filters</h4>
                {activeFilterCount > 0 && (
                  <Button
                    onClick={clearAll}
                    variant="ghost"
                    size="sm"
                    className="text-sm text-slate-600"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {filters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    {filter.icon}
                    {filter.label}
                  </label>

                  {filter.type === 'select' && filter.options && (
                    <select
                      value={activeFilters[filter.id] || ''}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    >
                      <option value="">All</option>
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.type === 'multiselect' && filter.options && (
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {filter.options.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={
                              activeFilters[filter.id]?.includes(opt.value) || false
                            }
                            onChange={(e) => {
                              const current = activeFilters[filter.id] || [];
                              const updated = e.target.checked
                                ? [...current, opt.value]
                                : current.filter((v: string) => v !== opt.value);
                              handleFilterChange(filter.id, updated);
                            }}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {filter.type === 'status' && filter.options && (
                    <div className="flex flex-wrap gap-2">
                      {filter.options.map((opt) => (
                        <Button
                          key={opt.value}
                          onClick={() => {
                            const isActive = activeFilters[filter.id] === opt.value;
                            handleFilterChange(
                              filter.id,
                              isActive ? undefined : opt.value
                            );
                          }}
                          variant={
                            activeFilters[filter.id] === opt.value
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {filter.type === 'text' && (
                    <Input
                      value={activeFilters[filter.id] || ''}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      placeholder={`Enter ${filter.label.toLowerCase()}`}
                      className="text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filter Tags */}
      {(activeFilterCount > 0 || searchQuery) && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 pl-2 pr-1 py-1"
            >
              Search: "{searchQuery}"
              <button
                onClick={() => handleSearchChange('')}
                className="ml-1 hover:bg-blue-100 rounded p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {Object.entries(activeFilters)
            .filter(([key]) => key !== 'search')
            .map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;

              const filter = filters.find((f) => f.id === key);
              if (!filter) return null;

              const displayValue = Array.isArray(value)
                ? `${value.length} selected`
                : filter.options?.find((opt) => opt.value === value)?.label || value;

              return (
                <Badge
                  key={key}
                  variant="outline"
                  className="bg-violet-50 text-violet-700 border-violet-200 pl-2 pr-1 py-1"
                >
                  {filter.icon && (
                    <span className="mr-1">{filter.icon}</span>
                  )}
                  {filter.label}: {displayValue}
                  <button
                    onClick={() => removeFilter(key)}
                    className="ml-1 hover:bg-violet-100 rounded p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}

          {(activeFilterCount > 0 || searchQuery) && (
            <Button
              onClick={clearAll}
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-slate-600 hover:text-slate-900"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
