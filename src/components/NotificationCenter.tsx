import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Bell,
  BellRing,
  X,
  Check,
  CheckCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
  Package,
  Truck,
  Factory,
  Users,
  Clock,
  Trash2,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: 'system' | 'orders' | 'shipments' | 'production' | 'alerts';
  actionable?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Low Stock Alert',
    message: '5 products are below reorder point',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    category: 'alerts',
    actionable: true,
  },
  {
    id: '2',
    type: 'success',
    title: 'Order Shipped',
    message: 'Order #ORD-47382 has been shipped via FedEx',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    category: 'shipments',
  },
  {
    id: '3',
    type: 'info',
    title: 'Production Complete',
    message: 'Batch BATCH-7264K finished with 98.5% quality score',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    category: 'production',
  },
  {
    id: '4',
    type: 'success',
    title: 'New Purchase Order',
    message: 'PO-2024-1547 approved and sent to supplier',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    read: true,
    category: 'orders',
  },
  {
    id: '5',
    type: 'error',
    title: 'Delayed Shipment',
    message: 'Shipment #SHP-9921 delayed by 2 days',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    category: 'shipments',
    actionable: true,
  },
  {
    id: '6',
    type: 'info',
    title: 'Team Member Added',
    message: 'John Smith joined the logistics team',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    category: 'system',
  },
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (notification: Notification) => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'orders':
        return <Package className="w-4 h-4" />;
      case 'shipments':
        return <Truck className="w-4 h-4" />;
      case 'production':
        return <Factory className="w-4 h-4" />;
      case 'system':
        return <Users className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-6 h-6 text-slate-700 animate-wiggle" />
        ) : (
          <Bell className="w-6 h-6 text-slate-700" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed top-16 right-4 w-96 max-h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-slate-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-slate-700" />
                  <h3 className="text-slate-900 font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setFilter('all')}
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                >
                  All ({notifications.length})
                </Button>
                <Button
                  onClick={() => setFilter('unread')}
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                >
                  Unread ({unreadCount})
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <ScrollArea className="flex-1 p-2">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="w-12 h-12 text-slate-300 mb-3" />
                  <p className="text-slate-500 font-medium">No notifications</p>
                  <p className="text-sm text-slate-400 mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-all ${
                        notification.read
                          ? 'bg-white border-slate-200'
                          : `${getTypeColor(notification.type)}`
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getIcon(notification)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-slate-900">
                              {notification.title}
                            </h4>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimestamp(notification.timestamp)}
                              </div>
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(notification.category)}
                                {notification.category}
                              </div>
                            </div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                          {notification.actionable && (
                            <Button
                              size="sm"
                              className="w-full mt-2 bg-blue-600 text-white"
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer Actions */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-slate-200 flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Mark all read
                  </Button>
                )}
                <Button
                  onClick={clearAll}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
