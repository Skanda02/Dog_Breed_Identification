import { motion } from 'framer-motion'
import { ArrowLeft, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold gradient-text mb-8"
            >
              About Us
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-gray-700 leading-relaxed text-lg"
            >
              <p>
                We're a team that believes great AI isn't just about powerful machine learning models, 
                but also about how people experience them.
              </p>

              <p>
                This project uses deep learning to accurately identify dog breeds from images, while 
                a clean and intuitive user experience makes the technology easy and enjoyable to use. 
                We focus on combining smart ML systems with thoughtful UX design so users can interact 
                with complex models without feeling overwhelmed.
              </p>

              <p>
                Our goal is to build AI solutions that are not only intelligent, but also simple, 
                accessible, and human-friendly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">AI-Powered</div>
                  <div className="text-sm text-gray-600">Deep Learning Models</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">User-Friendly</div>
                  <div className="text-sm text-gray-600">Intuitive Design</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">Accessible</div>
                  <div className="text-sm text-gray-600">For Everyone</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h3>
              <div className="flex justify-center gap-8">
                <motion.a
                  href="https://github.com/Skanda02"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 rounded-full group-hover:from-primary-600 group-hover:to-secondary-600 transition-all duration-300 shadow-lg">
                    <Github className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-gray-600 group-hover:text-primary-600 font-medium transition-colors">
                    Skanda02
                  </span>
                </motion.a>

                <motion.a
                  href="https://github.com/aashitha20"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 rounded-full group-hover:from-primary-600 group-hover:to-secondary-600 transition-all duration-300 shadow-lg">
                    <Github className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-gray-600 group-hover:text-primary-600 font-medium transition-colors">
                    aashitha20
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
