'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  DndContext, closestCenter, KeyboardSensor, PointerSensor, 
  useSensor, useSensors, DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, SortableContext, sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import { X } from 'lucide-react';
import { uploadProjectImage, deleteProjectImage } from '@/app/actions';

interface ImageItem {
  id: string;
  preview: string;
  fileName: string | null;
  file?: File;
  isNew: boolean;
  order: number;
}

interface Props {
  projectId: string;
  onClose: () => void;
  initialImages?: { 
    coverUrl?: string; 
    detailUrls: string[]; 
    images_order: string[];
  };
  onUploadComplete?: (result: { 
    cover_url: string; 
    detail_urls: string[]; 
    images_order: string[];
  }) => void;
}

export default function MultiImageUpload({ 
  projectId, onClose, initialImages, onUploadComplete 
}: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    if (initialImages) {
      const initial: ImageItem[] = initialImages.images_order.map((fileName, idx) => {
        const isCover = idx === 0;
        const previewUrl = isCover 
          ? initialImages.coverUrl || ''
          : initialImages.detailUrls[idx - 1] || '';
        return {
          id: `existing-${fileName}-${idx}`,
          preview: previewUrl,
          fileName,
          isNew: false,
          order: idx
        };
      });
      setImages(initial);
    }
  }, [initialImages]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: ImageItem[] = acceptedFiles.map((file, idx) => ({
      id: `new-${Date.now()}-${idx}`,
      preview: URL.createObjectURL(file),
      fileName: null,
      file,
      isNew: true,
      order: images.length + idx,
    }));
    setImages(prev => [...prev, ...newImages]);
  }, [images.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: true,
    maxSize: 10 * 1024 * 1024,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const updated = arrayMove(items, oldIndex, newIndex);
      return updated.map((img, idx) => ({ ...img, order: idx }));
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image?.fileName && !image.isNew) {
        deleteProjectImage(image.fileName);
      }
      const newImages = prev.filter(img => img.id !== id);
      return newImages.map((img, idx) => ({ ...img, order: idx }));
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const newFiles = images.filter(img => img.isNew && img.file);
      
      if (images.length === 0) {
          alert("Mindestens 1 Bild erforderlich.");
          setUploading(false);
          return;
      }

      const results: { fileName: string; publicUrl: string }[] = [];

        for (let i = 0; i < newFiles.length; i++) {
          const file = newFiles[i].file!;
          const result = await uploadProjectImage(
            projectId, 
            file, 
            'detail'
          );
          if (!result.success) throw new Error(result.error!);
          
          // FIX: Nur fileName und publicUrl pushen
          results.push({
            fileName: result.fileName!,
            publicUrl: result.publicUrl!
          });
        }


      let newFileIndex = 0;
      const finalImages = images.map(img => {
          if (img.isNew) {
              const result = results[newFileIndex];
              newFileIndex++;
              return {
                  fileName: result.fileName,
                  publicUrl: result.publicUrl
              };
          } else {
              return {
                  fileName: img.fileName,
                  publicUrl: img.preview
              };
          }
      });

      const cover_url = finalImages[0]?.publicUrl || '';
      const detail_urls = finalImages.slice(1).map(img => img.publicUrl).filter(Boolean) as string[];
      const images_order = finalImages.map(img => img.fileName).filter(Boolean) as string[];

      onUploadComplete?.({ cover_url, detail_urls, images_order });
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Speichern fehlgeschlagen: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const SortableImage = ({ image }: { image: ImageItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}
        className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm rounded-lg p-3 cursor-grab active:cursor-grabbing">
        <div className="relative">
          {image.preview && (
            <Image
              src={image.preview}
              alt={`Bild ${image.order + 1}`}
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded-md"
            />
          )}
          <div className="absolute -top-2 -right-2 bg-sky-600 text-white text-xs px-2 py-0.5 rounded-lg font-medium">
            #{image.order + 1}
          </div>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); removeImage(image.id); }}
            className="absolute top-1 right-1 bg-slate-200 hover:bg-red-500 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-all z-10"
          >
            <X className="w-4 h-4" />
          </button>
          {image.isNew && (
            <div className="absolute bottom-1 left-1 bg-sky-600 text-white text-xs px-1.5 py-0.5 rounded font-medium">
              NEU
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-200 shadow-md">
        <div className="px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Bilder verwalten ({images.length})
            </h2>
            <button onClick={onClose} 
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
              disabled={uploading}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div {...getRootProps()} className={`border-2 border-dashed border-slate-200 hover:border-sky-500 p-8 rounded-lg text-center transition-colors ${
            isDragActive ? 'bg-sky-50 border-sky-500' : 'bg-slate-50'
          }`}>
            <input {...getInputProps()} />
            <p className="text-lg font-semibold text-slate-900 mb-1">Bilder hier ablegen oder klicken</p>
            <p className="text-sm text-slate-600">PNG, JPG, WebP • Max 10MB</p>
          </div>

          {images.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Sortieren</h3>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map(img => img.id)} strategy={verticalListSortingStrategy}>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <SortableImage key={image.id} image={image} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              {images.filter(i => i.isNew).length} neue Bilder
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={uploading}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading || images.length === 0}
                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {uploading ? 'Hochladen...' : 'Speichern'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
