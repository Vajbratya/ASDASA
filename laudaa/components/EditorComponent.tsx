import React from 'react';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Sparkles } from "lucide-react";

interface EditorComponentProps {
  onGenerateReport: (content: string) => void;
  content: string;
  onContentChange: (content: string) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ onGenerateReport, content, onContentChange }) => {
  const handleStyleClick = (style: string) => {
    // This is a placeholder for text styling functionality
    console.log(`Applying style: ${style}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={() => handleStyleClick('bold')}><Bold className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => handleStyleClick('italic')}><Italic className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => handleStyleClick('underline')}><Underline className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => handleStyleClick('list')}><List className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => handleStyleClick('alignLeft')}><AlignLeft className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => handleStyleClick('alignCenter')}><AlignCenter className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => handleStyleClick('alignRight')}><AlignRight className="h-4 w-4" /></Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Start typing your report..."
        className="min-h-[300px]"
      />
      <Button onClick={() => onGenerateReport(content)}>
        <Sparkles className="h-4 w-4 mr-2" />
        Generate Report
      </Button>
    </div>
  );
};

export default EditorComponent;