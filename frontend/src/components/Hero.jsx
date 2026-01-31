import { motion } from 'framer-motion'
import { Sparkles, Zap, Heart } from 'lucide-react'

const Hero = () => {
  return (
    <section className="max-w-5xl mx-auto text-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block mb-4"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            AI-Powered Breed Detection
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Your
          <span className="gradient-text"> Pup's Breed </span>
          in Seconds! 🐾
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Upload any dog photo and let our AI instantly identify the breed with 
          <span className="text-primary-600 font-semibold"> cutting-edge accuracy</span>.
          Fast, fun, and totally free!
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white rounded-2xl px-6 py-4 shadow-md"
          >
            <Zap className="w-6 h-6 text-secondary-500" />
            <div className="text-left">
              <p className="text-sm text-gray-500">Processing Speed</p>
              <p className="font-bold text-gray-900">Under 3s</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white rounded-2xl px-6 py-4 shadow-md"
          >
            <Heart className="w-6 h-6 text-primary-500" />
            <div className="text-left">
              <p className="text-sm text-gray-500">Accuracy Rate</p>
              <p className="font-bold text-gray-900">95%+</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white rounded-2xl px-6 py-4 shadow-md"
          >
            <Sparkles className="w-6 h-6 text-secondary-500" />
            <div className="text-left">
              <p className="text-sm text-gray-500">Breeds Supported</p>
              <p className="font-bold text-gray-900">120+</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gray-400"
        >
          ↓ Upload a photo below ↓
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
