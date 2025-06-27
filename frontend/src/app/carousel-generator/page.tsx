'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { CarouselTemplateSelector } from '@/components/carousel/CarouselTemplateSelector';
import { CarouselInput } from '@/components/carousel/CarouselInput';
import { CarouselPreview } from '@/components/carousel/CarouselPreview';
import { templates } from '@/components/carousel/templates';
import { exportSlidesAsPDF, exportSlidesAsTXT, copyAllSlides } from '@/components/carousel/utils';

export default function CarouselGenerator() {
  const [inputText, setInputText] = useState('');
  const [pageCount, setPageCount] = useState(5);
  const [generatedSlides, setGeneratedSlides] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSlides, setEditedSlides] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string>('');

  const generateCarousel = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    setError('');
    
    try {
      console.log('Attempting to generate carousel with:', { inputText: inputText.trim(), pageCount });
      
      const response = await fetch('http://localhost:5000/api/carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userInput: inputText.trim(),
          pageCount: pageCount
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      const slides = data.slides || [];
      
      if (slides.length === 0) {
        throw new Error('No slides generated from API');
      }

      setGeneratedSlides(slides);
      setEditedSlides([...slides]);
      console.log('Successfully generated', slides.length, 'slides');
      
    } catch (error) {
      console.error('Error generating carousel:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      
      // Show user-friendly error message
      alert(`Failed to generate carousel: ${error instanceof Error ? error.message : 'Unknown error'}. Please check if the backend server is running on http://localhost:5000`);
      
      // Fallback to mock data for development
      const mockSlides = [
        `🚀 ${inputText}\n\nSlide 1: Introduction\n\nThis is the opening slide that introduces your main topic and hooks your audience. We'll explore the key concepts and provide actionable insights throughout this carousel.`,
        `💡 Key Point #1\n\nHere's the first major insight or tip related to your topic. Make it actionable and valuable for your audience. Include specific examples or data when possible to support your point.`,
        `📈 Key Point #2\n\nThe second important point that builds on the first. This slide should provide additional depth and context to your message. Consider including statistics or real-world applications.`,
        `🎯 Key Point #3\n\nYour third main point that adds even more value to your message. Keep it focused and relevant to your overall theme. This is where you can dive deeper into practical applications.`,
        `✅ Conclusion\n\nWrap up with a clear call-to-action or summary. Encourage engagement and discussion from your audience. Ask a thought-provoking question or invite them to share their experiences.`
      ].slice(0, pageCount);
      
      setGeneratedSlides(mockSlides);
      setEditedSlides([...mockSlides]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSlideEdit = (index: number, newContent: string) => {
    const updated = [...editedSlides];
    updated[index] = newContent;
    setEditedSlides(updated);
  };

  const saveEdits = () => {
    setGeneratedSlides([...editedSlides]);
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setEditedSlides([...generatedSlides]);
    setIsEditing(false);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const slidesToExport = isEditing ? editedSlides : generatedSlides;
      await exportSlidesAsPDF(slidesToExport, selectedTemplate);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportTXT = () => {
    const slidesToExport = isEditing ? editedSlides : generatedSlides;
    exportSlidesAsTXT(slidesToExport);
  };

  const handleCopyAll = () => {
    const slidesToExport = isEditing ? editedSlides : generatedSlides;
    copyAllSlides(slidesToExport);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Header />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🎠
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Carousel Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create engaging carousel posts that tell your story across multiple slides
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  <strong>API Connection Error:</strong> {error}
                </p>
              </div>
              <p className="text-red-600 dark:text-red-400 text-xs mt-2">
                Make sure the backend server is running on http://localhost:5000. Using fallback content for now.
              </p>
            </div>
          )}

          <CarouselTemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
          />

          <CarouselInput
            inputText={inputText}
            pageCount={pageCount}
            onInputChange={setInputText}
            onPageCountChange={setPageCount}
            onGenerate={generateCarousel}
            isGenerating={isGenerating}
          />

          <CarouselPreview
            slides={generatedSlides}
            template={selectedTemplate}
            isEditing={isEditing}
            editedSlides={editedSlides}
            onSlideEdit={handleSlideEdit}
            onSaveEdits={saveEdits}
            onCancelEdits={cancelEdits}
            onStartEditing={() => setIsEditing(true)}
            onGenerate={generateCarousel}
            onExportPDF={handleExportPDF}
            onExportTXT={handleExportTXT}
            onCopyAll={handleCopyAll}
            isExporting={isExporting}
          />
        </div>
      </div>
    </div>
  );
}