import { useState } from 'react'
import Hero from '../components/Hero'
import UploadCard from '../components/UploadCard'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import { predictBreed } from '../services/api'

const Home = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleImageUpload = async (file) => {
    setImage(URL.createObjectURL(file))
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const prediction = await predictBreed(file)
      setResult(prediction)
    } catch (err) {
      setError(err.message || 'Failed to predict breed. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setImage(null)
    setResult(null)
    setError(null)
    setLoading(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {!image ? (
        <>
          <Hero />
          <UploadCard onUpload={handleImageUpload} />
        </>
      ) : (
        <div className="max-w-4xl mx-auto mt-8">
          {loading && <Loader />}
          
          {!loading && result && (
            <ResultCard
              image={image}
              result={result}
              onReset={handleReset}
            />
          )}
          
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <button
                onClick={handleReset}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  )
}

export default Home
