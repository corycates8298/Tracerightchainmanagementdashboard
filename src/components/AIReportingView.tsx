import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Bot, FileText, Sparkles, MessageSquare } from 'lucide-react';

const sampleQuestions = [
  'What are our top performing suppliers?',
  'Show me delayed shipments this month',
  'Which materials have the highest defect rates?',
  'What is our average delivery time by region?',
];

const conversationHistory = [
  {
    id: 1,
    type: 'user',
    message: 'What are our top performing suppliers?',
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    type: 'ai',
    message: 'Based on your governance documents and recent data, your top 3 performing suppliers are:\n\n1. **Pacific Resources Ltd** - 98% on-time delivery, 99% quality score\n2. **Global Materials Inc** - 96% on-time delivery, 98% quality score\n3. **Premier Supply Co** - 92% on-time delivery, 95% quality score\n\nThese suppliers have consistently met SOP requirements outlined in your compliance documentation.',
    timestamp: '10:30 AM',
    sources: ['Supplier Scorecards', 'Q3 2025 Performance Report', 'SOP-SUPP-001'],
  },
];

export function AIReportingView() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(conversationHistory);

  const handleAsk = () => {
    if (!query.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    // Simulate AI response
    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      message: 'I\'m analyzing your question against uploaded compliance documents, SOPs, and operational data. This is a demo response showing how the AI would answer based on your governance documentation.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['Compliance Report 2025', 'SOP Documentation'],
    };
    
    setMessages([...messages, userMessage as any, aiMessage as any]);
    setQuery('');
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-slate-900 mb-1">AI Governance Hub</h2>
          <p className="text-sm text-slate-600">RAG-powered document search</p>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="text-xs text-slate-600 mb-3">SAMPLE QUESTIONS</div>
          <div className="space-y-2">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setQuery(question)}
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-colors text-sm text-slate-700"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="text-xs text-slate-600 mb-3">KNOWLEDGE BASE</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
              <FileText className="w-4 h-4 text-slate-600" />
              <div className="text-sm text-slate-900">47 Documents</div>
            </div>
            <div className="text-xs text-slate-600 mt-3 mb-2">Categories:</div>
            <div className="space-y-1 text-sm text-slate-700">
              <div className="pl-3">• SOPs (12)</div>
              <div className="pl-3">• Contracts (18)</div>
              <div className="pl-3">• Compliance (9)</div>
              <div className="pl-3">• Regulations (8)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h1 className="text-slate-900">AI Reporting</h1>
          <p className="text-slate-600 mt-1">Ask natural language questions about your operations</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          {/* Welcome Message */}
          <Card className="p-6 border-slate-200 bg-gradient-to-br from-violet-50 to-purple-50">
            <div className="flex items-start gap-3">
              <Bot className="w-6 h-6 text-violet-600 mt-1" />
              <div>
                <h3 className="text-slate-900 mb-1">Welcome to AI Reporting</h3>
                <p className="text-sm text-slate-700">
                  Ask me anything about your uploaded compliance documents, SOPs, contracts, and regulations. 
                  I use Retrieval-Augmented Generation (RAG) to provide accurate answers based on your governance documentation.
                </p>
              </div>
            </div>
          </Card>

          {/* Conversation */}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${msg.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                <div className={`p-4 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white' 
                    : 'bg-white border border-slate-200'
                }`}>
                  {msg.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-violet-700">AI Assistant</span>
                    </div>
                  )}
                  <div className={`whitespace-pre-line ${msg.type === 'user' ? 'text-white' : 'text-slate-700'}`}>
                    {msg.message}
                  </div>
                  {msg.type === 'ai' && msg.sources && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="text-xs text-slate-600 mb-2">Sources:</div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className={`text-xs text-slate-500 mt-1 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Ask a question about your compliance docs, SOPs, or operations..." 
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              />
            </div>
            <Button 
              onClick={handleAsk}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              <Bot className="w-4 h-4 mr-2" />
              Ask AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
