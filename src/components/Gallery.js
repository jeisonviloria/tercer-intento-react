import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sample image data - you can replace these with your own images
  const images = [
    {
      id: 1,
      url: 'https://picsum.photos/id/10/800/600',
      title: 'Computer Setup',
      description: 'Modern computer workspace with natural lighting',
      date: '2023-10-31'
    },
    {
      id: 2,
      url: 'https://picsum.photos/id/11/800/600',
      title: 'Forest Lake',
      description: 'Serene lake surrounded by mountains',
      date: '2023-10-30'
    },
    {
      id: 3,
      url: 'https://picsum.photos/id/12/800/600',
      title: 'Mountain Valley',
      description: 'Beautiful mountain landscape at sunset',
      date: '2023-10-29'
    },
    {
      id: 4,
      url: 'https://picsum.photos/id/13/800/600',
      title: 'Desert Rocks',
      description: 'Rocky desert landscape under blue sky',
      date: '2023-10-28'
    },
    {
      id: 5,
      url: 'https://picsum.photos/id/14/800/600',
      title: 'Ocean View',
      description: 'Peaceful ocean view with waves',
      date: '2023-10-27'
    },
    {
      id: 6,
      url: 'https://picsum.photos/id/15/800/600',
      title: 'Forest Path',
      description: 'Path through a dense forest',
      date: '2023-10-26'
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setLightboxOpen(false);
    setZoomLevel(1); // Reset zoom level when closing
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5)); // Min zoom 0.5x
  };

  const handlePrevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  const handleDownload = async (image) => {
    try {
      // Mostrar un mensaje de carga
      const downloadButton = document.querySelector('.download-button');
      const originalText = downloadButton.textContent;
      downloadButton.textContent = 'Descargando...';
      
      // Fetch la imagen
      const response = await fetch(image.url);
      const blob = await response.blob();
      
      // Crear URL del blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Crear link y descargar
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${image.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      
      // Limpieza
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      downloadButton.textContent = originalText;
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
      alert('No se pudo descargar la imagen. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="gallery-container">
      <h2>My Gallery</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => handleImageClick(image)}
          >
            <img src={image.url} alt={image.title} />
            <div className="image-overlay">
              <p>{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div className="lightbox-overlay">
          <div className="lightbox-content">
            <button className="close-button" onClick={handleCloseLightbox}>×</button>
            <button className="nav-button prev" onClick={handlePrevImage}>‹</button>
            <button className="nav-button next" onClick={handleNextImage}>›</button>
            
            <div className="zoom-controls">
              <button className="zoom-button" onClick={handleZoomOut}>
                <span role="img" aria-label="zoom out">🔍-</span>
              </button>
              <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
              <button className="zoom-button" onClick={handleZoomIn}>
                <span role="img" aria-label="zoom in">🔍+</span>
              </button>
            </div>

            <div className="image-container">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
            
            <div className="lightbox-details">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <p className="date">Fecha: {selectedImage.date}</p>
              <button 
                className="download-button"
                onClick={() => handleDownload(selectedImage)}
              >
                Descargar Imagen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;