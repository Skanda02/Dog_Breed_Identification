import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const Loader = () => {
  const pawVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">🐾</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Analyzing Your Pup...
        </h3>
        <p className="text-gray-600">
          Our AI is sniffing out the breed 🐶
        </p>
      </motion.div>

      <div className="flex gap-2 mt-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={pawVariants}
            animate="animate"
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="text-2xl"
          >
            🐾
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8 flex items-center gap-2 text-primary-600"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">Processing image...</span>
      </motion.div>
    </motion.div>
  )
}

export default Loader
