import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CarouselTemplate } from './types';

export const exportSlidesAsPDF = async (
  slides: string[],
  template: CarouselTemplate
): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1200, 1500]
  });

  for (let i = 0; i < slides.length; i++) {
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '1200px';
    tempContainer.style.height = '1500px';
    document.body.appendChild(tempContainer);

    // Create slide element directly as DOM element
    const slideElement = document.createElement('div');
    slideElement.style.width = '1200px';
    slideElement.style.height = '1500px';
    slideElement.style.background = template.pdfStyle.background;
    slideElement.style.display = 'flex';
    slideElement.style.flexDirection = 'column';
    slideElement.style.justifyContent = 'center';
    slideElement.style.alignItems = 'center';
    slideElement.style.padding = '120px 100px';
    slideElement.style.fontFamily = 'Arial, sans-serif';
    slideElement.style.position = 'relative';
    slideElement.style.boxSizing = 'border-box';

    // Parse content
    const lines = slides[i].split('\n').filter(line => line.trim());
    const title = lines[0] || `Slide ${i + 1}`;
    const bodyContent = lines.slice(1).join('\n');

    // Add template-specific decorations
    if (template.id === 'modern') {
      // Header bar
      const headerBar = document.createElement('div');
      headerBar.style.position = 'absolute';
      headerBar.style.top = '0';
      headerBar.style.left = '0';
      headerBar.style.right = '0';
      headerBar.style.height = '12px';
      headerBar.style.background = template.pdfStyle.primaryColor;
      slideElement.appendChild(headerBar);

      // Decorative circle
      const circle = document.createElement('div');
      circle.style.position = 'absolute';
      circle.style.top = '60px';
      circle.style.right = '60px';
      circle.style.width = '150px';
      circle.style.height = '150px';
      circle.style.border = `6px solid ${template.pdfStyle.accentColor}`;
      circle.style.borderRadius = '50%';
      circle.style.opacity = '0.3';
      slideElement.appendChild(circle);

      // Bottom accent
      const bottomAccent = document.createElement('div');
      bottomAccent.style.position = 'absolute';
      bottomAccent.style.bottom = '60px';
      bottomAccent.style.left = '60px';
      bottomAccent.style.width = '200px';
      bottomAccent.style.height = '8px';
      bottomAccent.style.background = template.pdfStyle.primaryColor;
      bottomAccent.style.opacity = '0.6';
      slideElement.appendChild(bottomAccent);

      // Footer gradient
      const footerGradient = document.createElement('div');
      footerGradient.style.position = 'absolute';
      footerGradient.style.bottom = '0';
      footerGradient.style.left = '0';
      footerGradient.style.right = '0';
      footerGradient.style.height = '8px';
      footerGradient.style.background = `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`;
      slideElement.appendChild(footerGradient);
    }

    if (template.id === 'creative') {
      // Large decorative shape
      const shape1 = document.createElement('div');
      shape1.style.position = 'absolute';
      shape1.style.top = '40px';
      shape1.style.right = '40px';
      shape1.style.width = '180px';
      shape1.style.height = '180px';
      shape1.style.background = 'rgba(255,255,255,0.2)';
      shape1.style.borderRadius = '40px';
      shape1.style.transform = 'rotate(15deg)';
      slideElement.appendChild(shape1);

      // Circle accent
      const circle = document.createElement('div');
      circle.style.position = 'absolute';
      circle.style.bottom = '40px';
      circle.style.left = '40px';
      circle.style.width = '120px';
      circle.style.height = '120px';
      circle.style.background = 'rgba(251,191,36,0.8)';
      circle.style.borderRadius = '50%';
      slideElement.appendChild(circle);

      // Small accent shape
      const shape2 = document.createElement('div');
      shape2.style.position = 'absolute';
      shape2.style.top = '200px';
      shape2.style.left = '80px';
      shape2.style.width = '60px';
      shape2.style.height = '60px';
      shape2.style.background = 'rgba(255,255,255,0.3)';
      shape2.style.borderRadius = '20px';
      shape2.style.transform = 'rotate(-20deg)';
      slideElement.appendChild(shape2);

      // Footer gradient
      const footerGradient = document.createElement('div');
      footerGradient.style.position = 'absolute';
      footerGradient.style.bottom = '0';
      footerGradient.style.left = '0';
      footerGradient.style.right = '0';
      footerGradient.style.height = '12px';
      footerGradient.style.background = 'linear-gradient(90deg, #fbbf24 0%, #ec4899 50%, #8b5cf6 100%)';
      slideElement.appendChild(footerGradient);
    }

    if (template.id === 'minimal') {
      // Top line
      const topLine = document.createElement('div');
      topLine.style.position = 'absolute';
      topLine.style.top = '80px';
      topLine.style.right = '80px';
      topLine.style.width = '120px';
      topLine.style.height = '4px';
      topLine.style.background = template.pdfStyle.accentColor;
      slideElement.appendChild(topLine);

      // Side line
      const sideLine = document.createElement('div');
      sideLine.style.position = 'absolute';
      sideLine.style.bottom = '80px';
      sideLine.style.left = '80px';
      sideLine.style.width = '4px';
      sideLine.style.height = '120px';
      sideLine.style.background = template.pdfStyle.accentColor;
      slideElement.appendChild(sideLine);

      // Small dot
      const dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.top = '150px';
      dot.style.left = '80px';
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.background = template.pdfStyle.primaryColor;
      dot.style.borderRadius = '50%';
      slideElement.appendChild(dot);
    }

    if (template.id === 'tech') {
      // Background gradient overlay
      const bgOverlay = document.createElement('div');
      bgOverlay.style.position = 'absolute';
      bgOverlay.style.top = '0';
      bgOverlay.style.left = '0';
      bgOverlay.style.right = '0';
      bgOverlay.style.bottom = '0';
      bgOverlay.style.background = 'radial-gradient(circle at 20% 80%, rgba(0,212,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(52,211,153,0.15) 0%, transparent 50%)';
      slideElement.appendChild(bgOverlay);

      // Tech border
      const techBorder = document.createElement('div');
      techBorder.style.position = 'absolute';
      techBorder.style.top = '60px';
      techBorder.style.right = '60px';
      techBorder.style.width = '150px';
      techBorder.style.height = '150px';
      techBorder.style.border = `4px solid ${template.pdfStyle.primaryColor}`;
      techBorder.style.borderRadius = '16px';
      techBorder.style.opacity = '0.4';
      slideElement.appendChild(techBorder);

      // Glowing accent
      const glowAccent = document.createElement('div');
      glowAccent.style.position = 'absolute';
      glowAccent.style.bottom = '200px';
      glowAccent.style.left = '100px';
      glowAccent.style.width = '80px';
      glowAccent.style.height = '80px';
      glowAccent.style.background = 'rgba(0,212,255,0.2)';
      glowAccent.style.borderRadius = '50%';
      glowAccent.style.filter = 'blur(2px)';
      slideElement.appendChild(glowAccent);

      // Footer gradient
      const footerGradient = document.createElement('div');
      footerGradient.style.position = 'absolute';
      footerGradient.style.bottom = '0';
      footerGradient.style.left = '0';
      footerGradient.style.right = '0';
      footerGradient.style.height = '8px';
      footerGradient.style.background = `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`;
      footerGradient.style.boxShadow = `0 0 20px ${template.pdfStyle.primaryColor}50`;
      slideElement.appendChild(footerGradient);
    }

    // Create slide number
    const slideNumber = document.createElement('div');
    slideNumber.style.position = 'absolute';
    slideNumber.style.top = '60px';
    slideNumber.style.left = '60px';
    slideNumber.style.fontSize = '24px';
    slideNumber.style.color = template.pdfStyle.primaryColor;
    slideNumber.style.fontWeight = 'bold';
    slideNumber.textContent = `${i + 1}/${slides.length}`;
    slideElement.appendChild(slideNumber);

    // Create main content container - centered
    const contentContainer = document.createElement('div');
    contentContainer.style.textAlign = 'center';
    contentContainer.style.maxWidth = '900px';
    contentContainer.style.width = '100%';
    contentContainer.style.zIndex = '10';
    contentContainer.style.display = 'flex';
    contentContainer.style.flexDirection = 'column';
    contentContainer.style.justifyContent = 'center';
    contentContainer.style.alignItems = 'center';
    contentContainer.style.minHeight = '800px';

    // Create title with dynamic font sizing
    const titleElement = document.createElement('h1');
    const titleLength = title.length;
    let titleFontSize = '64px';
    
    // Adjust title font size based on length for larger format
    if (titleLength > 80) {
      titleFontSize = '48px';
    } else if (titleLength > 60) {
      titleFontSize = '56px';
    } else if (titleLength > 40) {
      titleFontSize = '60px';
    }
    
    titleElement.style.fontSize = titleFontSize;
    titleElement.style.fontWeight = 'bold';
    titleElement.style.color = template.pdfStyle.headerColor;
    titleElement.style.marginBottom = '60px';
    titleElement.style.lineHeight = '1.2';
    titleElement.style.margin = '0 0 60px 0';
    titleElement.style.textAlign = 'center';
    titleElement.style.wordWrap = 'break-word';
    titleElement.style.overflowWrap = 'break-word';
    titleElement.style.hyphens = 'auto';
    titleElement.textContent = title;
    contentContainer.appendChild(titleElement);

    // Create body content with dynamic font sizing
    if (bodyContent) {
      const bodyElement = document.createElement('div');
      const bodyLength = bodyContent.length;
      let bodyFontSize = '28px';
      
      // Adjust body font size based on content length for larger format
      if (bodyLength > 800) {
        bodyFontSize = '24px';
      } else if (bodyLength > 600) {
        bodyFontSize = '26px';
      } else if (bodyLength > 400) {
        bodyFontSize = '28px';
      } else {
        bodyFontSize = '30px';
      }
      
      bodyElement.style.fontSize = bodyFontSize;
      bodyElement.style.lineHeight = '1.6';
      bodyElement.style.color = template.pdfStyle.textColor;
      bodyElement.style.whiteSpace = 'pre-wrap';
      bodyElement.style.textAlign = 'center';
      bodyElement.style.maxWidth = '800px';
      bodyElement.style.wordWrap = 'break-word';
      bodyElement.style.overflowWrap = 'break-word';
      bodyElement.style.hyphens = 'auto';
      bodyElement.textContent = bodyContent;
      contentContainer.appendChild(bodyElement);
    }

    slideElement.appendChild(contentContainer);
    tempContainer.appendChild(slideElement);

    try {
      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Convert to canvas with higher resolution for better quality
      const canvas = await html2canvas(slideElement, {
        width: 1200,
        height: 1500,
        scale: 2, // Higher scale for better quality
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        imageTimeout: 0,
        removeContainer: true,
      });

      // Add to PDF
      if (i > 0) {
        pdf.addPage();
      }
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, 1200, 1500);

    } catch (error) {
      console.error(`Error processing slide ${i + 1}:`, error);
      throw error;
    } finally {
      // Clean up
      document.body.removeChild(tempContainer);
    }
  }

  // Save the PDF
  pdf.save('carousel-slides.pdf');
};

export const exportSlidesAsTXT = (slides: string[]): void => {
  const textContent = slides.map((slide, index) => 
    `Slide ${index + 1}:\n${slide}\n\n`
  ).join('');
  
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'carousel-slides.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyAllSlides = (slides: string[]): void => {
  const allSlides = slides.map((slide, index) => 
    `Slide ${index + 1}:\n${slide}\n\n`
  ).join('');
  navigator.clipboard.writeText(allSlides);
};