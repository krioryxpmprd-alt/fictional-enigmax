import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TemplateRenderer = ({ 
  template, 
  customFont, 
  event, 
  formatDate, 
  handleOpenUploadModal, 
  children 
}) => {
  // Add structured data for the event
  const eventStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event?.name,
    startDate: event?.date,
    description: event?.description || `Photo sharing event: ${event?.name}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: {
      '@type': 'Organization',
      name: 'MemoryBox'
    }
  };

  if (event.page_template === 'classic' || event.page_template === 'template1') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
        <ClassicTemplate
          template={template}
          customFont={customFont}
          event={event}
          formatDate={formatDate}
          handleOpenUploadModal={handleOpenUploadModal}
          children={children}
        />
      </>
    );
  }

  if (event.page_template === 'modern' || event.page_template === 'template2') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
        <ModernTemplate
          template={template}
          customFont={customFont}
          event={event}
          formatDate={formatDate}
          handleOpenUploadModal={handleOpenUploadModal}
          children={children}
        />
      </>
    );
  }

  if (event.page_template === 'elegant' || event.page_template === 'template3') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
        <ElegantTemplate
          template={template}
          customFont={customFont}
          event={event}
          handleOpenUploadModal={handleOpenUploadModal}
          children={children}
        />
      </>
    );
  }

  return <TemplateNotFound />;
};

const ClassicTemplate = ({ template, customFont, event, formatDate, handleOpenUploadModal, children }) => (
  <div className="min-h-screen" style={{ backgroundColor: template.bgColor, fontFamily: customFont }}>
    {/* Header with semantic structure */}
    <header className="w-full mx-auto pt-8 px-4">
      {event.cover_image && (
        <Image 
          src={event.cover_image} 
          alt={`Cover image for ${event.name}`}
          className="w-full rounded-lg shadow-lg"
          width={1200}
          height={400}
          priority
        />
      )}
    </header>
    
    {/* Main event information */}
    <main className="text-center py-8 px-4">
      <p className="text-lg mb-2" style={{ fontFamily: customFont }}>
        <time dateTime={event.date}>{formatDate(event.date)}</time>
      </p>
      <h1 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: customFont }}>
        {event.name}
      </h1>
      
      <div className="max-w-md mx-auto">
        <TemplateButton
          template={template}
          onClick={handleOpenUploadModal}
          text="📸 Share Your Memories"
          ariaLabel={`Share photos and memories for ${event.name}`}
        />
      </div>
    </main>

    {/* Content section */}
    <section aria-labelledby="event-content">
      {children}
    </section>
  </div>
);

const ModernTemplate = ({ template, customFont, event, formatDate, handleOpenUploadModal, children }) => (
  <div 
    className="min-h-screen relative"
    style={{ fontFamily: customFont }}
  >
    {/* Background with semantic overlay */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: event.cover_image ? `url(${event.cover_image})` : 'none' }}
      role="img"
      aria-label={`Background for ${event.name}`}
    />
    <div className="absolute inset-0 bg-black bg-opacity-40" aria-hidden="true"></div>
    
    {/* Main content */}
    <div className="relative z-10 min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col justify-end pb-20 px-4">
        <div className="text-left max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: customFont }}>
            {event.name}
          </h1>
          <p className="text-xl text-white mb-8">
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </p>
          
          <TemplateButton
            template={template}
            onClick={handleOpenUploadModal}
            text="Share Your Memories"
            ariaLabel={`Upload photos and share memories for ${event.name}`}
          />
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="text-center pb-8" aria-hidden="true">
        <p className="text-white">Scroll to View Content ↓</p>
      </div>
    </div>

    {/* Content section */}
    <section className="relative z-10 bg-white" aria-labelledby="event-gallery">
      {children}
    </section>
  </div>
);

const ElegantTemplate = ({ template, customFont, event, handleOpenUploadModal, children }) => (
  <div 
    className="min-h-screen relative"
    style={{ fontFamily: customFont }}
  >
    {/* Background layers */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: event.cover_image ? `url(${event.cover_image})` : 'none' }}
      role="img"
      aria-label={`Elegant background for ${event.name}`}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-gray-800/60 to-gray-900/80" aria-hidden="true"></div>
    <div 
      className="absolute inset-0" 
      style={{ 
        backgroundColor: 'rgba(139, 119, 101, 0.3)',
        mixBlendMode: 'multiply'
      }}
      aria-hidden="true"
    ></div>
    
    {/* Main content */}
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <main className="text-center mb-8">
        <h1 className="text-6xl md:text-7xl font-serif text-white mb-2" style={{ fontFamily: customFont }}>
          {event.name}
        </h1>
      </main>

      <div className="space-y-4 w-full max-w-md">
        <TemplateButton
          template={template}
          onClick={handleOpenUploadModal}
          text="Share Your Memories"
          withBorder={true}
          ariaLabel={`Contribute to ${event.name} memory collection`}
        />
      </div>

      {/* Scroll indicator */}
      <div className="text-center mt-12" aria-hidden="true">
        <p className="text-white text-sm">Scroll to View Content ↓</p>
      </div>
    </div>

    {/* Content section */}
    <section className="relative z-10 bg-white" aria-labelledby="event-content">
      {children}
    </section>
  </div>
);

const TemplateButton = ({ template, onClick, text, withBorder = false, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`w-full py-4 px-8 rounded-lg text-white font-semibold transition-colors duration-200 ${
      withBorder ? 'backdrop-blur-sm border border-white/30' : ''
    }`}
    style={{ 
      backgroundColor: template.buttonColor,
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = template.buttonHoverColor}
    onMouseLeave={(e) => e.target.style.backgroundColor = template.buttonColor}
    aria-label={ariaLabel}
  >
    {text}
  </button>
);

const TemplateNotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Template Not Found</h1>
      <p className="text-gray-600 mb-4">The template configuration is missing.</p>
      <Link 
        href="/"
        className="text-[#f2adc8] hover:underline font-medium"
        aria-label="Return to MemoryBox homepage"
      >
        Return to Homepage
      </Link>
    </div>
  </div>
);

export default React.memo(TemplateRenderer);