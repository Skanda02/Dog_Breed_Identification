import { motion } from 'framer-motion'
import { RefreshCw, Award, TrendingUp, Info } from 'lucide-react'

const ResultCard = ({ image, result, onReset }) => {
  const { breed, confidence, topPredictions } = result

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 card-shadow"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={image}
              alt="Uploaded dog"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 btn-secondary"
          >
            <RefreshCw className="w-5 h-5" />
            Try Another Photo
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-primary-600 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Top Prediction
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {breed}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full"
                />
              </div>
              <span className="text-lg font-bold text-primary-600">
                {confidence}%
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-gray-900">Other Possibilities</h3>
            </div>
            
            <div className="space-y-3">
              {topPredictions && topPredictions.slice(1, 4).map((pred, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700 font-medium">{pred.breed}</span>
                  <span className="text-gray-600 font-semibold">{pred.confidence}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Our AI model analyzes over 120 dog breeds with 95%+ accuracy. 
              Results are based on deep learning trained on thousands of dog images.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResultCard
