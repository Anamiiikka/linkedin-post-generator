'use client';

import React from 'react';
import { CarouselTemplate } from './types';

interface SlideDisplayProps {
  content: string;
  slideNumber: number;
  totalSlides: number;
  template: CarouselTemplate;
  isForPDF?: boolean;
}

export function SlideDisplay({ 
  content, 
  slideNumber, 
  totalSlides, 
  template, 
  isForPDF = false 
}: SlideDisplayProps) {
  const lines = content.split('\n').filter(line => line.trim());
  const title = lines[0] || `Slide ${slideNumber}`;
  const bodyContent = lines.slice(1).join('\n');

  if (isForPDF) {
    return (
      <div 
        style={{
          width: '800px',
          height: '600px',
          background: template.pdfStyle.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Header bar */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '8px',
          background: template.pdfStyle.primaryColor,
        }} />
        
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: template.pdfStyle.accentColor,
          opacity: 0.3,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: template.pdfStyle.secondaryColor,
          opacity: 0.2,
        }} />
        
        {/* Slide number */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          fontSize: '14px',
          color: template.pdfStyle.primaryColor,
          fontWeight: 'bold',
        }}>
          {slideNumber}/{totalSlides}
        </div>

        {/* Main content */}
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: template.pdfStyle.headerColor,
            marginBottom: '30px',
            lineHeight: '1.2',
          }}>
            {title}
          </h1>
          
          {bodyContent && (
            <div style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: template.pdfStyle.textColor,
              whiteSpace: 'pre-wrap',
            }}>
              {bodyContent}
            </div>
          )}
        </div>

        {/* Footer gradient */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`,
        }} />
      </div>
    );
  }

  // Enhanced template-specific styling for preview
  const getTemplateSpecificElements = () => {
    switch (template.id) {
      case 'modern':
        return (
          <>
            {/* Modern template decorative elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full"></div>
            </div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-indigo-500/10 rounded-full"></div>
            <div className="absolute top-1/2 right-8 w-2 h-16 bg-blue-500/20 rounded-full transform -translate-y-1/2"></div>
          </>
        );
      case 'creative':
        return (
          <>
            {/* Creative template decorative elements */}
            <div className="absolute top-6 right-6 w-10 h-10 bg-purple-500/20 rounded-lg rotate-12"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 bg-pink-500/30 rounded-full"></div>
            <div className="absolute top-1/3 left-4 w-4 h-4 bg-purple-400/25 transform rotate-45"></div>
            <div className="absolute bottom-1/3 right-4 w-3 h-12 bg-pink-400/20 rounded-full"></div>
          </>
        );
      case 'minimal':
        return (
          <>
            {/* Minimal template decorative elements */}
            <div className="absolute top-4 right-4 w-16 h-0.5 bg-gray-400/30"></div>
            <div className="absolute bottom-4 left-4 w-8 h-0.5 bg-gray-500/40"></div>
            <div className="absolute top-1/2 left-4 w-0.5 h-8 bg-gray-400/30 transform -translate-y-1/2"></div>
          </>
        );
      case 'tech':
        return (
          <>
            {/* Tech template decorative elements */}
            <div className="absolute top-4 right-4 w-10 h-10 border-2 border-cyan-500/30 rounded-lg"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-teal-500/20 rounded-sm transform rotate-45"></div>
            <div className="absolute top-1/3 right-8 w-1 h-20 bg-cyan-400/25 rounded-full"></div>
            <div className="absolute bottom-1/3 left-8 w-8 h-1 bg-teal-400/25 rounded-full"></div>
          </>
        );
      default:
        return null;
    }
  };

  const getTemplateSpecificTextStyles = () => {
    switch (template.id) {
      case 'modern':
        return {
          title: 'text-blue-900 dark:text-blue-100 font-bold',
          body: 'text-blue-800 dark:text-blue-200'
        };
      case 'creative':
        return {
          title: 'text-purple-900 dark:text-purple-100 font-bold',
          body: 'text-purple-800 dark:text-purple-200'
        };
      case 'minimal':
        return {
          title: 'text-gray-900 dark:text-gray-100 font-semibold',
          body: 'text-gray-700 dark:text-gray-300'
        };
      case 'tech':
        return {
          title: 'text-cyan-900 dark:text-cyan-100 font-bold',
          body: 'text-cyan-800 dark:text-cyan-200'
        };
      default:
        return {
          title: 'text-gray-800 dark:text-gray-200 font-bold',
          body: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const textStyles = getTemplateSpecificTextStyles();

  return (
    <div className={`${template.style} rounded-xl p-8 min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden`}>
      {/* Template-specific decorative elements */}
      {getTemplateSpecificElements()}

      {/* Slide number with template-specific styling */}
      <div className={`absolute top-4 left-4 text-sm font-bold opacity-70 ${
        template.id === 'modern' ? 'text-blue-600 dark:text-blue-400' :
        template.id === 'creative' ? 'text-purple-600 dark:text-purple-400' :
        template.id === 'minimal' ? 'text-gray-600 dark:text-gray-400' :
        template.id === 'tech' ? 'text-cyan-600 dark:text-cyan-400' :
        'text-gray-600 dark:text-gray-400'
      }`}>
        {slideNumber}/{totalSlides}
      </div>

      {/* Main content with enhanced styling */}
      <div className="text-center max-w-full z-10 relative">
        <h1 className={`text-3xl mb-6 ${textStyles.title} leading-tight`}>
          {title}
        </h1>
        
        {bodyContent && (
          <div className={`text-lg leading-relaxed ${textStyles.body} whitespace-pre-wrap max-w-2xl`}>
            {bodyContent}
          </div>
        )}
      </div>

      {/* Template-specific accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${
        template.id === 'modern' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
        template.id === 'creative' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
        template.id === 'minimal' ? 'bg-gray-400' :
        template.id === 'tech' ? 'bg-gradient-to-r from-cyan-500 to-teal-500' :
        'bg-gray-400'
      }`}></div>
    </div>
  );
}