import axios from 'axios'

// Use relative URL for proxy in dev, or full URL from env
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const predictBreed = async (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return {
      breed: response.data.breed,
      confidence: response.data.confidence,
      topPredictions: response.data.topPredictions || [
        { breed: response.data.breed, confidence: response.data.confidence }
      ],
    }
  } catch (error) {
    if (error.response?.status === 413) {
      throw new Error('Image file is too large. Please upload a smaller image.')
    }
    
    if (error.response?.status === 415) {
      throw new Error('Invalid file format. Please upload a valid image file.')
    }
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    
    throw new Error('Failed to connect to the server. Please try again later.')
  }
}

export const getBreedInfo = async (breedName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/breed/${breedName}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch breed info:', error)
    return null
  }
}
