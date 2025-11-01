import { ReactNode } from 'react';
import { X, ExternalLink, Download, Share2, Printer } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  tabs?: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
  children?: ReactNode;
  actions?: ReactNode;
}

export function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  tabs,
  children,
  actions,
}: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col m-4">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-slate-900 text-2xl font-semibold">{title}</h2>
              {badge}
            </div>
            {subtitle && (
              <p className="text-slate-600 text-sm">{subtitle}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
              title="Export"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          {tabs ? (
            <Tabs defaultValue={tabs[0].id}>
              <TabsList className="mb-6">
                {tabs.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map(tab => (
                <TabsContent key={tab.id} value={tab.id}>
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            children
          )}
        </ScrollArea>

        {/* Footer */}
        {actions && (
          <div className="flex items-center justify-end gap-2 p-4 border-t border-slate-200 bg-slate-50">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
