import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Edit, Eye, Folder, Image as ImageIcon, Plus, X } from 'lucide-react';

interface ImageFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  category: string;
  uploadedAt: Date;
  isExisting?: boolean;
}

const ImageManager: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', name: 'Alle Bilder', icon: ImageIcon },
    { id: 'hero', name: 'Hero-Bereich', icon: Folder },
    { id: 'services', name: 'Services', icon: Folder },
    { id: 'gallery', name: 'Galerie', icon: Folder }
  ];

  // Load existing images on component mount
  useEffect(() => {
    loadExistingImages();
  }, []);

  const loadExistingImages = () => {
    const existingImages: ImageFile[] = [
      // Hero images
      {
        id: 'hero-1',
        name: 'hero-main.jpg',
        url: '/images/hero/hero-main.jpg',
        size: 443000,
        type: 'image/jpeg',
        category: 'hero',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      // Service images
      {
        id: 'service-1',
        name: 'express-transport.jpg',
        url: '/images/services/express-transport.jpg',
        size: 349000,
        type: 'image/jpeg',
        category: 'services',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'service-2',
        name: 'long-distance.jpg',
        url: '/images/services/long-distance.jpg',
        size: 335000,
        type: 'image/jpeg',
        category: 'services',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'service-3',
        name: 'office-move.jpg',
        url: '/images/services/office-move.jpg',
        size: 331000,
        type: 'image/jpeg',
        category: 'services',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'service-4',
        name: 'private-move.jpg',
        url: '/images/services/private-move.jpg',
        size: 562000,
        type: 'image/jpeg',
        category: 'services',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'service-5',
        name: 'storage.jpg',
        url: '/images/services/storage.jpg',
        size: 219000,
        type: 'image/jpeg',
        category: 'services',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'service-6',
        name: 'clearance.jpg',
        url: '/images/services/clearance.jpg',
        size: 162000,
        type: 'image/jpeg',
        category: 'services',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      // Gallery images
      {
        id: 'gallery-1',
        name: 'gallery-1.jpg',
        url: '/images/gallery/gallery-1.jpg',
        size: 249000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-2',
        name: 'gallery-2.jpg',
        url: '/images/gallery/gallery-2.jpg',
        size: 239000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-3',
        name: 'gallery-3.jpg',
        url: '/images/gallery/gallery-3.jpg',
        size: 175000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-4',
        name: 'gallery-4.jpg',
        url: '/images/gallery/gallery-4.jpg',
        size: 236000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-5',
        name: 'gallery-5.jpg',
        url: '/images/gallery/gallery-5.jpg',
        size: 244000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-6',
        name: 'gallery-6.jpg',
        url: '/images/gallery/gallery-6.jpg',
        size: 242000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-7',
        name: 'gallery-7.jpg',
        url: '/images/gallery/gallery-7.jpg',
        size: 164000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-8',
        name: 'gallery-8.jpg',
        url: '/images/gallery/gallery-8.jpg',
        size: 196000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      },
      {
        id: 'gallery-9',
        name: 'gallery-9.jpg',
        url: '/images/gallery/gallery-9.jpg',
        size: 149000,
        type: 'image/jpeg',
        category: 'gallery',
        uploadedAt: new Date('2024-01-01'),
        isExisting: true
      }
    ];

    setImages(existingImages);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadProgress(0);

    const newImages: ImageFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Simulate upload progress
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(((i + 1) / files.length) * 100);

      // Create preview URL
      const url = URL.createObjectURL(file);
      
      const imageFile: ImageFile = {
        id: Date.now().toString() + i,
        name: file.name,
        url: url,
        size: file.size,
        type: file.type,
        category: selectedCategory === 'all' ? 'gallery' : selectedCategory,
        uploadedAt: new Date()
      };

      newImages.push(imageFile);
    }

    setImages(prev => [...prev, ...newImages]);
    setIsUploading(false);
      setUploadProgress(0);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = (imageId: string) => {
    const imageToDelete = images.find(img => img.id === imageId);
    if (imageToDelete?.isExisting) {
      alert('Bestehende Bilder können nicht gelöscht werden. Sie sind Teil der Website.');
      return;
    }
      setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Bilder hochladen</h4>
        
        <div className="space-y-4">
          {/* Category Selection */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategorie auswählen
            </label>
          <select
            value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
              </option>
            ))}
          </select>
      </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
              multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-5 h-5" />
              <span>{isUploading ? 'Wird hochgeladen...' : 'Bilder auswählen'}</span>
            </button>
            <p className="text-sm text-gray-600 mt-2">
              JPG, PNG, WebP bis 10MB pro Bild
            </p>
              </div>
              
          {/* Upload Progress */}
          {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                <span>Fortschritt</span>
                <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                />
                  </div>
                </div>
              )}
            </div>
          </div>

      {/* Image Gallery */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-800">
            Bildverwaltung ({filteredImages.length} Bilder)
          </h4>
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
            </div>
              </div>
              
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Keine Bilder in dieser Kategorie</p>
              </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image Preview */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200">
                    <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => {
                          setSelectedImage(image);
                          setIsImageModalOpen(true);
                        }}
                        className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                </button>
                      {!image.isExisting && (
                <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="p-1 bg-white rounded-full shadow-lg hover:bg-red-100"
                >
                          <Trash2 className="w-4 h-4 text-red-600" />
                </button>
                      )}
                    </div>
                  </div>
                  {image.isExisting && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Bestehend
                      </span>
                    </div>
                  )}
                </div>

                {/* Image Info */}
                <div className="p-3">
                  <h5 className="font-medium text-gray-900 truncate">{image.name}</h5>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                    <span>{formatFileSize(image.size)}</span>
                    <span>{image.uploadedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {image.category}
                    </span>
              </div>
            </div>
          </div>
            ))}
        </div>
      )}
      </div>

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{selectedImage.name}</h3>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="w-full h-auto max-h-96 object-contain rounded-lg"
              />
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p><strong>Größe:</strong> {formatFileSize(selectedImage.size)}</p>
                <p><strong>Typ:</strong> {selectedImage.type}</p>
                <p><strong>Kategorie:</strong> {selectedImage.category}</p>
                <p><strong>Hochgeladen:</strong> {selectedImage.uploadedAt.toLocaleString()}</p>
                {selectedImage.isExisting && (
                  <p><strong>Status:</strong> <span className="text-green-600">Bestehendes Bild</span></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManager;

