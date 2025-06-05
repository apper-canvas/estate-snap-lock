import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import { propertyService } from '../services'

const Home = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: ''
  })
  const [filteredProperties, setFilteredProperties] = useState([])

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true)
      try {
        const result = await propertyService.getAll()
        setProperties(result)
        setFilteredProperties(result)
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load properties")
      } finally {
        setLoading(false)
      }
    }
    loadProperties()

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(savedFavorites)
  }, [])

  useEffect(() => {
    let filtered = [...properties]

    if (filters.search) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.address.city.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice))
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms))
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType)
    }

    setFilteredProperties(filtered)
  }, [filters, properties])

  const toggleFavorite = (propertyId) => {
    const updatedFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId]
    
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    
    toast.success(
      favorites.includes(propertyId) 
        ? "Removed from favorites" 
        : "Added to favorites"
    )
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      propertyType: ''
    })
  }

  const favoriteProperties = properties.filter(property => 
    favorites.includes(property.id)
  )

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-surface-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Home" className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EstateSnap
                </h1>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-surface-600 hover:text-primary transition-colors">Buy</a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors">Rent</a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors">Agents</a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors">About</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="relative p-2 text-surface-600 hover:text-primary transition-colors"
              >
                <ApperIcon name="Heart" className="h-6 w-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2 text-surface-600 hover:text-primary transition-colors">
                <ApperIcon name="Menu" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <MainFeature
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          resultCount={filteredProperties.length}
        />

        {/* Property Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="aspect-video bg-surface-200 shimmer"></div>
                  <div className="p-6">
                    <div className="h-4 bg-surface-200 rounded shimmer mb-3"></div>
                    <div className="h-3 bg-surface-200 rounded shimmer mb-2 w-3/4"></div>
                    <div className="flex space-x-4 mt-4">
                      <div className="h-3 bg-surface-200 rounded shimmer w-16"></div>
                      <div className="h-3 bg-surface-200 rounded shimmer w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 gradient-overlay"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="text-white">
                          <div className="text-2xl font-bold font-heading">
                            ${property.price.toLocaleString()}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(property.id)
                          }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                        >
                          <ApperIcon
                            name="Heart"
                            className={`h-5 w-5 ${
                              favorites.includes(property.id)
                                ? 'text-accent fill-current'
                                : 'text-white'
                            }`}
                          />
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-surface-600 mb-4">
                        {property.address.street}, {property.address.city}
                      </p>

                      <div className="flex items-center space-x-6 text-surface-600">
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Bed" className="h-4 w-4" />
                          <span className="text-sm">{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Bath" className="h-4 w-4" />
                          <span className="text-sm">{property.bathrooms} baths</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ApperIcon name="Square" className="h-4 w-4" />
                          <span className="text-sm">{property.squareFootage} sq ft</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                          {property.propertyType}
                        </span>
                        <button className="text-primary hover:text-secondary text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="Home" className="h-16 w-16 text-surface-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-surface-600 mb-4">
                Try adjusting your search criteria or clearing filters
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Favorites Sidebar */}
      <AnimatePresence>
        {showFavorites && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowFavorites(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-surface-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold font-heading">
                    Favorites ({favorites.length})
                  </h2>
                  <button
                    onClick={() => setShowFavorites(false)}
                    className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto h-full pb-24">
                {favoriteProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <ApperIcon name="Heart" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                    <p className="text-surface-600">No favorites yet</p>
                  </div>
                ) : (
                  favoriteProperties.map((property) => (
                    <div key={property.id} className="flex space-x-3 p-3 bg-surface-50 rounded-xl">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {property.title}
                        </h4>
                        <p className="text-xs text-surface-600 truncate">
                          {property.address.city}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          ${property.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <ApperIcon name="X" className="h-4 w-4 text-surface-400" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home