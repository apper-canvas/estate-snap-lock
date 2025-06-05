import favoriteData from '../mockData/favorite.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const favoriteService = {
  async getAll() {
    await delay(200)
    return [...favoriteData]
  },

  async getById(id) {
    await delay(150)
    const favorite = favoriteData.find(item => item.propertyId === id)
    if (!favorite) {
      throw new Error('Favorite not found')
    }
    return { ...favorite }
  },

  async create(favorite) {
    await delay(250)
    const newFavorite = {
      ...favorite,
      savedDate: new Date().toISOString()
    }
    favoriteData.push(newFavorite)
    return { ...newFavorite }
  },

  async update(id, updates) {
    await delay(200)
    const index = favoriteData.findIndex(item => item.propertyId === id)
    if (index === -1) {
      throw new Error('Favorite not found')
    }
    favoriteData[index] = { ...favoriteData[index], ...updates }
    return { ...favoriteData[index] }
  },

  async delete(propertyId) {
    await delay(200)
    const index = favoriteData.findIndex(item => item.propertyId === propertyId)
    if (index === -1) {
      throw new Error('Favorite not found')
    }
    const deleted = favoriteData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default favoriteService