import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  currentImage?: string;
}

export default function ProfilePictureModal({
  isOpen,
  onClose,
  onUpload,
  currentImage,
}: ProfilePictureModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1C1F2D] p-6 rounded-2xl shadow-xl max-w-md w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Update Profile Picture</h3>
            
            <div className="mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={previewUrl || currentImage || '/images/mainlogo.png'}
                  alt="Profile Preview"
                  fill
                  className="rounded-full object-cover border-4 border-white/10"
                />
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose New Picture
              </button>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
