import searchFilterData from '../mockData/searchFilter.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const searchFilterService = {
  async getAll() {
    await delay(200)
    return [...searchFilterData]
  },

  async getById(id) {
    await delay(150)
    const filter = searchFilterData.find(item => item.id === id)
    if (!filter) {
      throw new Error('Search filter not found')
    }
    return { ...filter }
  },

  async create(filter) {
    await delay(300)
    const newFilter = {
      ...filter,
      id: Date.now().toString()
    }
    searchFilterData.push(newFilter)
    return { ...newFilter }
  },

  async update(id, updates) {
    await delay(250)
    const index = searchFilterData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Search filter not found')
    }
    searchFilterData[index] = { ...searchFilterData[index], ...updates }
    return { ...searchFilterData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = searchFilterData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Search filter not found')
    }
    const deleted = searchFilterData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default searchFilterService