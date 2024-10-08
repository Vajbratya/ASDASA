import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import EditorComponent from '../components/EditorComponent';
import AIAssistant from '../components/AIAssistant';
import AutoTexto from '../components/AutoTexto';

const EnhancedRadiologyReportGenerator: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reportContent, setReportContent] = useState('');

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prevState => !prevState);
  }, []);

  const handleGenerateReport = useCallback((content: string) => {
    // Here you would typically call an AI service to process the report
    console.log('Generating report based on:', content);
    // For now, let's just update the report content
    setReportContent(content);
  }, []);

  const handleInsertContent = useCallback((content: string) => {
    setReportContent(prevContent => prevContent + ' ' + content);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex overflow-hidden">
        {isSidebarOpen && (
          <aside className="w-64 p-4 border-r overflow-y-auto">
            <AutoTexto onInsertContent={handleInsertContent} />
          </aside>
        )}
        <main className="flex-1 p-4 overflow-y-auto">
          <EditorComponent 
            onGenerateReport={handleGenerateReport} 
            content={reportContent}
            onContentChange={setReportContent}
          />
        </main>
        <aside className="w-80 p-4 border-l overflow-y-auto">
          <AIAssistant reportContent={reportContent} />
        </aside>
      </div>
    </div>
  );
};

export default EnhancedRadiologyReportGenerator;