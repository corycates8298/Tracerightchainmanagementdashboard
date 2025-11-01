import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus, Minus, Check, X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
}

interface SmartDataChatbotProps {
  onDataChange: (action: 'add' | 'remove' | 'update', data: any) => void;
  context?: string;
  placeholder?: string;
}

export function SmartDataChatbot({ onDataChange, context = 'general', placeholder = 'Ask me to add or remove data...' }: SmartDataChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm your smart assistant. I can help you add, remove, or update data. Try saying things like:\n\n• "Add 50 units of Lavender Soap to batch BATCH-001"\n• "Remove SKU-123 from the order"\n• "Update the quantity to 100"\n• "Show me all items in this shipment"`,
      timestamp: new Date(),
      suggestions: [
        'Add item',
        'Remove item',
        'Update quantity',
        'Show all items',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const parseCommand = (text: string): { action: 'add' | 'remove' | 'update' | 'show' | 'unknown'; data?: any } => {
    const lowerText = text.toLowerCase();

    // Add commands
    if (lowerText.includes('add')) {
      const quantityMatch = text.match(/(\d+)\s*(units?|pcs?|pieces?)?/i);
      const itemMatch = text.match(/of\s+(.+?)(?:\s+to\s+|\s+in\s+|$)/i);
      const batchMatch = text.match(/(?:batch|lot)\s+([A-Z0-9-]+)/i);
      const skuMatch = text.match(/(?:sku|product)\s+([A-Z0-9-]+)/i);

      return {
        action: 'add',
        data: {
          quantity: quantityMatch ? parseInt(quantityMatch[1]) : 1,
          item: itemMatch ? itemMatch[1].trim() : null,
          batch: batchMatch ? batchMatch[1] : null,
          sku: skuMatch ? skuMatch[1] : null,
        },
      };
    }

    // Remove commands
    if (lowerText.includes('remove') || lowerText.includes('delete')) {
      const skuMatch = text.match(/(?:sku|product)\s+([A-Z0-9-]+)/i);
      const itemMatch = text.match(/(?:remove|delete)\s+(.+?)(?:\s+from\s+|$)/i);

      return {
        action: 'remove',
        data: {
          sku: skuMatch ? skuMatch[1] : null,
          item: itemMatch ? itemMatch[1].trim() : null,
        },
      };
    }

    // Update commands
    if (lowerText.includes('update') || lowerText.includes('change') || lowerText.includes('set')) {
      const quantityMatch = text.match(/(?:quantity|qty|amount)\s+(?:to\s+)?(\d+)/i);
      const skuMatch = text.match(/(?:sku|product)\s+([A-Z0-9-]+)/i);

      return {
        action: 'update',
        data: {
          quantity: quantityMatch ? parseInt(quantityMatch[1]) : null,
          sku: skuMatch ? skuMatch[1] : null,
        },
      };
    }

    // Show commands
    if (lowerText.includes('show') || lowerText.includes('list') || lowerText.includes('display')) {
      return {
        action: 'show',
        data: {},
      };
    }

    return { action: 'unknown' };
  };

  const generateResponse = (command: ReturnType<typeof parseCommand>): string => {
    switch (command.action) {
      case 'add':
        if (!command.data.item) {
          return "I'd love to help you add an item! Could you specify what you'd like to add? For example: 'Add 50 units of Lavender Soap'";
        }
        return `Great! I'll add ${command.data.quantity} unit(s) of ${command.data.item}${
          command.data.batch ? ` to batch ${command.data.batch}` : ''
        }${command.data.sku ? ` (SKU: ${command.data.sku})` : ''}. Is this correct?`;

      case 'remove':
        if (!command.data.item && !command.data.sku) {
          return "Which item would you like to remove? Please specify the SKU or product name.";
        }
        return `I'll remove ${command.data.sku || command.data.item}. Confirm?`;

      case 'update':
        if (!command.data.quantity) {
          return "What would you like to update? For example: 'Update quantity to 100' or 'Change SKU-123 quantity to 50'";
        }
        return `I'll update${command.data.sku ? ` ${command.data.sku}` : ' the item'} to ${command.data.quantity} units. Confirm?`;

      case 'show':
        return "Here's the current data in the system. Would you like to see specific details?";

      default:
        return "I'm not sure I understand. Try commands like:\n• Add [quantity] of [item]\n• Remove [SKU/item]\n• Update quantity to [number]\n• Show all items";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Parse command
    const command = parseCommand(input);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate response
    const response = generateResponse(command);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions:
        command.action !== 'unknown'
          ? ['Yes, confirm', 'No, cancel', 'Modify']
          : ['Add item', 'Remove item', 'Show all'],
      data: command.data,
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);

    // If action is valid, trigger callback
    if (command.action !== 'unknown' && command.action !== 'show') {
      onDataChange(command.action as 'add' | 'remove' | 'update', command.data);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    if (suggestion === 'Yes, confirm') {
      // Handle confirmation
      const lastBotMessage = messages[messages.length - 1];
      if (lastBotMessage.type === 'bot' && lastBotMessage.data) {
        const confirmMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: '✅ Done! Your changes have been applied.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirmMessage]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Smart Data Assistant</h3>
          <p className="text-xs text-slate-600">AI-powered data entry helper</p>
        </div>
        <div className="ml-auto">
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            Online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-slate-200'
                    : 'bg-gradient-to-br from-violet-600 to-purple-600'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-slate-700" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-violet-600 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-900 rounded-tl-none'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-violet-200' : 'text-slate-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* Suggestions */}
                {message.type === 'bot' && message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white hover:bg-violet-50 hover:border-violet-300"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-lg bg-slate-100 rounded-tl-none">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white"
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Try: "Add 50 units of Lavender Soap" or "Remove SKU-123"
        </div>
      </div>
    </Card>
  );
}
