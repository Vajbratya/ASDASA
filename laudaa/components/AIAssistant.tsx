import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Sparkles } from "lucide-react";

interface AIAssistantProps {
  reportContent: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ reportContent }) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (reportContent) {
      setMessages(prevMessages => [...prevMessages, { role: 'system', content: `New report content: ${reportContent}` }]);
    }
  }, [reportContent]);

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setMessages(prevMessages => [...prevMessages, { role: 'user', content: input }]);
      setInput('');
      // Here you would typically call an AI service and then add its response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'This is a placeholder AI response.' }]);
      }, 1000);
    }
  }, [input]);

  const handleGenerateReport = useCallback(() => {
    // This is where you would typically trigger the report generation process
    console.log('Generating report based on conversation');
    setMessages(prevMessages => [...prevMessages, { role: 'system', content: 'Generating report...' }]);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 
                  message.role === 'system' ? 'bg-secondary text-secondary-foreground' : 
                  'bg-muted'
                }`}>
                  {message.content}
                </span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="flex mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask the AI assistant..."
          className="flex-grow"
        />
        <Button onClick={handleSend} className="ml-2">
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
      <Button variant="outline" className="mt-2" onClick={handleGenerateReport}>
        <Sparkles className="h-4 w-4 mr-2" />
        Generate Report
      </Button>
    </div>
  );
};

export default AIAssistant;