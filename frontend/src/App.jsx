import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <footer className="mt-20 py-8 text-center text-gray-600">
          <p className="text-sm">
            Made with 🐾 and AI • Powered by Deep Learning
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
