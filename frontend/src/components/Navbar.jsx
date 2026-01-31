import { motion } from 'framer-motion'
import { Dog, Info } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full">
                <Dog className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                Pawsitive ID
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-full font-medium"
                title="About Us"
              >
                <Info className="w-5 h-5" />
                <span className="hidden sm:inline">About</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
