import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon, X } from 'lucide-react'

const UploadCard = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFile(file)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file) => {
    setPreview(URL.createObjectURL(file))
    onUpload(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const clearPreview = () => {
    setPreview(null)
  }

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`
              relative border-4 border-dashed rounded-3xl p-12 text-center
              transition-all duration-300 cursor-pointer card-shadow
              ${isDragging 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50/30'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <motion.div
              animate={{ y: isDragging ? -10 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {isDragging ? 'Drop it like it\'s hot! 🔥' : 'Upload Your Pup\'s Photo'}
              </h3>

              <p className="text-gray-600 mb-6">
                Drag & drop or click to browse
              </p>

              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-3 py-1 rounded-full">JPG</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">PNG</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">WEBP</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Max 10MB</span>
              </div>
            </motion.div>

            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-primary-500/10 rounded-3xl"
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-3xl p-6 card-shadow"
          >
            <button
              onClick={clearPreview}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-primary-600">
                <ImageIcon className="w-5 h-5" />
                <span className="font-medium">Image uploaded successfully!</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadCard
