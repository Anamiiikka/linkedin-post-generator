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
          width: '1200px',
          height: '1500px',
          background: template.pdfStyle.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '120px 100px',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Template-specific PDF decorations */}
        {template.id === 'modern' && (
          <>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '12px',
              background: template.pdfStyle.primaryColor,
            }} />
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '60px',
              width: '150px',
              height: '150px',
              border: `6px solid ${template.pdfStyle.accentColor}`,
              borderRadius: '50%',
              opacity: 0.3,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '60px',
              width: '200px',
              height: '8px',
              background: template.pdfStyle.primaryColor,
              opacity: 0.6,
            }} />
          </>
        )}

        {template.id === 'creative' && (
          <>
            <div style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              width: '180px',
              height: '180px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '40px',
              transform: 'rotate(15deg)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              width: '120px',
              height: '120px',
              background: 'rgba(251,191,36,0.8)',
              borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute',
              top: '200px',
              left: '80px',
              width: '60px',
              height: '60px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '20px',
              transform: 'rotate(-20deg)',
            }} />
          </>
        )}

        {template.id === 'minimal' && (
          <>
            <div style={{
              position: 'absolute',
              top: '80px',
              right: '80px',
              width: '120px',
              height: '4px',
              background: template.pdfStyle.accentColor,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '80px',
              left: '80px',
              width: '4px',
              height: '120px',
              background: template.pdfStyle.accentColor,
            }} />
            <div style={{
              position: 'absolute',
              top: '150px',
              left: '80px',
              width: '8px',
              height: '8px',
              background: template.pdfStyle.primaryColor,
              borderRadius: '50%',
            }} />
          </>
        )}

        {template.id === 'tech' && (
          <>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'radial-gradient(circle at 20% 80%, rgba(0,212,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(52,211,153,0.15) 0%, transparent 50%)',
            }} />
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '60px',
              width: '150px',
              height: '150px',
              border: `4px solid ${template.pdfStyle.primaryColor}`,
              borderRadius: '16px',
              opacity: 0.4,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '200px',
              left: '100px',
              width: '80px',
              height: '80px',
              background: 'rgba(0,212,255,0.2)',
              borderRadius: '50%',
              filter: 'blur(2px)',
            }} />
          </>
        )}
        
        {/* Slide number */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '60px',
          fontSize: '24px',
          color: template.pdfStyle.primaryColor,
          fontWeight: 'bold',
        }}>
          {slideNumber}/{totalSlides}
        </div>

        {/* Main content container - centered */}
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '800px',
        }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: template.pdfStyle.headerColor,
            marginBottom: '60px',
            lineHeight: '1.2',
            textAlign: 'center',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
          }}>
            {title}
          </h1>
          
          {bodyContent && (
            <div style={{
              fontSize: '28px',
              lineHeight: '1.6',
              color: template.pdfStyle.textColor,
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
              maxWidth: '800px',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
            }}>
              {bodyContent}
            </div>
          )}
        </div>

        {/* Bottom decorative elements */}
        {template.id === 'modern' && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '8px',
            background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`,
          }} />
        )}
        {template.id === 'creative' && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: `linear-gradient(90deg, #fbbf24 0%, #ec4899 50%, #8b5cf6 100%)`,
          }} />
        )}
        {template.id === 'tech' && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '8px',
            background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`,
            boxShadow: `0 0 20px ${template.pdfStyle.primaryColor}50`,
          }} />
        )}
      </div>
    );
  }

  // Enhanced template-specific styling for preview (800x600)
  const getTemplateSpecificElements = () => {
    switch (template.id) {
      case 'modern':
        return (
          <>
            {/* Modern Professional Design */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
            <div className="absolute top-6 right-6 w-20 h-20 border-3 border-blue-500/30 rounded-full"></div>
            <div className="absolute bottom-6 left-6 w-32 h-1 bg-blue-600/60"></div>
            <div className="absolute top-1/2 right-12 w-1 h-24 bg-blue-400/20 transform -translate-y-1/2"></div>
            
            {/* Geometric accent */}
            <div className="absolute top-20 left-6 w-4 h-4 bg-blue-500/40 transform rotate-45"></div>
          </>
        );
      case 'creative':
        return (
          <>
            {/* Creative Vibrant Design with flowing shapes */}
            <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-3xl transform rotate-12"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-400/80 rounded-full"></div>
            <div className="absolute top-1/3 left-8 w-8 h-8 bg-white/30 rounded-lg transform -rotate-12"></div>
            
            {/* Flowing wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-20 -translate-y-20"></div>
          </>
        );
      case 'minimal':
        return (
          <>
            {/* Minimal Clean Design */}
            <div className="absolute top-8 right-8 w-16 h-0.5 bg-gray-400"></div>
            <div className="absolute bottom-8 left-8 w-0.5 h-16 bg-gray-400"></div>
            
            {/* Subtle geometric elements */}
            <div className="absolute top-16 left-8 w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="absolute bottom-16 right-8 w-3 h-3 border border-gray-400"></div>
            
            {/* Clean typography emphasis line */}
            <div className="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 transform -translate-x-1/2 translate-y-16"></div>
          </>
        );
      case 'tech':
        return (
          <>
            {/* Tech Modern Design with digital elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5"></div>
            
            {/* Circuit-like patterns */}
            <div className="absolute top-6 right-6 w-20 h-20 border-2 border-cyan-400/40 rounded-lg"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-emerald-400/20 rounded transform rotate-45"></div>
            
            {/* Digital grid pattern */}
            <div className="absolute top-1/4 right-12 w-px h-20 bg-cyan-400/30"></div>
            <div className="absolute top-1/3 right-8 w-8 h-px bg-cyan-400/30"></div>
            
            {/* Glowing accent */}
            <div className="absolute bottom-1/4 left-12 w-6 h-6 bg-cyan-400/20 rounded-full blur-sm"></div>
            <div className="absolute bottom-1/4 left-12 w-3 h-3 bg-cyan-400 rounded-full"></div>
            
            {/* Network connection lines */}
            <div className="absolute top-20 left-20 w-16 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
            <div className="absolute bottom-20 right-20 w-px h-16 bg-gradient-to-b from-emerald-400/50 to-transparent"></div>
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
          title: 'text-gray-900 dark:text-white font-bold tracking-tight',
          body: 'text-gray-700 dark:text-gray-300 font-medium'
        };
      case 'creative':
        return {
          title: 'text-white font-bold tracking-wide drop-shadow-lg',
          body: 'text-white/95 font-medium drop-shadow'
        };
      case 'minimal':
        return {
          title: 'text-gray-900 dark:text-white font-light tracking-wide',
          body: 'text-gray-600 dark:text-gray-400 font-normal'
        };
      case 'tech':
        return {
          title: 'text-white font-bold tracking-tight drop-shadow-lg',
          body: 'text-gray-100 font-medium'
        };
      default:
        return {
          title: 'text-gray-800 dark:text-gray-200 font-bold',
          body: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const getSlideNumberStyle = () => {
    switch (template.id) {
      case 'modern':
        return 'text-blue-600 dark:text-blue-400 font-bold bg-white/80 px-2 py-1 rounded';
      case 'creative':
        return 'text-white font-bold bg-black/20 px-2 py-1 rounded backdrop-blur-sm';
      case 'minimal':
        return 'text-gray-600 dark:text-gray-400 font-medium';
      case 'tech':
        return 'text-cyan-400 font-bold bg-black/30 px-2 py-1 rounded border border-cyan-400/30';
      default:
        return 'text-gray-600 dark:text-gray-400 font-bold';
    }
  };

  const textStyles = getTemplateSpecificTextStyles();

  return (
    <div 
      className={`${template.style} rounded-xl p-8 relative overflow-hidden shadow-2xl`}
      style={{ width: '800px', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* Template-specific decorative elements */}
      {getTemplateSpecificElements()}

      {/* Slide number with template-specific styling */}
      <div className={`absolute top-4 left-4 text-sm z-20 ${getSlideNumberStyle()}`}>
        {slideNumber}/{totalSlides}
      </div>

      {/* Main content with enhanced styling */}
      <div className="text-center max-w-full z-10 relative px-4">
        <h1 className={`text-3xl md:text-4xl mb-6 ${textStyles.title} leading-tight`}>
          {title}
        </h1>
        
        {bodyContent && (
          <div className={`text-lg leading-relaxed ${textStyles.body} whitespace-pre-wrap max-w-2xl mx-auto`}>
            {bodyContent}
          </div>
        )}
      </div>

      {/* Template-specific bottom accent */}
      {template.id === 'modern' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
      )}
      {template.id === 'creative' && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"></div>
      )}
      {template.id === 'minimal' && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gray-400"></div>
      )}
      {template.id === 'tech' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-400/50"></div>
      )}
    </div>
  );
}