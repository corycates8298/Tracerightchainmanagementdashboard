import { ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';

interface BreadcrumbItem {
  label: string;
  view?: string;
  onClick?: () => void;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  onNavigate?: (view: string) => void;
}

export function BreadcrumbNav({ items = [], showHome = true, onNavigate }: BreadcrumbNavProps) {
  const handleClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.view && onNavigate) {
      onNavigate(item.view);
    }
  };

  const handleHomeClick = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <nav className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-200 text-sm">
      {showHome && (
        <>
          <Button
            onClick={handleHomeClick}
            variant="ghost"
            size="sm"
            className="h-7 px-2 hover:bg-slate-100"
          >
            <Home className="w-4 h-4" />
          </Button>
          {items.length > 0 && (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </>
      )}

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index === items.length - 1 ? (
            <span className="font-medium text-slate-900">{item.label}</span>
          ) : (
            <>
              <Button
                onClick={() => handleClick(item)}
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {item.label}
              </Button>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
