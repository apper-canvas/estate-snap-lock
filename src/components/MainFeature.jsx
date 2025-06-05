import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const MainFeature = ({ filters, setFilters, clearFilters, resultCount }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa']
  const bedroomOptions = [1, 2, 3, 4, 5]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6"
        >
          Find Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dream Home</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto"
        >
          Discover the perfect property with our comprehensive real estate platform. 
          Browse thousands of listings and find your ideal home today.
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-card p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Search */}
          <div className="flex-1 relative">
            <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search by location, property name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="px-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white min-w-32"
            >
              <option value="">Property Type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              className="px-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white min-w-32"
            >
              <option value="">Bedrooms</option>
              {bedroomOptions.map(num => (
                <option key={num} value={num}>{num}+ beds</option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-6 py-3 rounded-xl border-2 transition-all font-medium flex items-center space-x-2 ${
                showAdvancedFilters 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-surface-200 bg-white text-surface-700 hover:border-primary'
              }`}
            >
              <ApperIcon name="Filter" className="h-5 w-5" />
              <span className="hidden sm:inline">Filters</span>
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters */}
        <motion.div
          initial={false}
          animate={{ height: showAdvancedFilters ? 'auto' : 0, opacity: showAdvancedFilters ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-6 border-t border-surface-100 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="No limit"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-2 flex items-end space-x-3">
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={clearFilters}
                    className="px-6 py-3 bg-surface-100 text-surface-700 rounded-xl hover:bg-surface-200 transition-colors font-medium flex items-center space-x-2"
                  >
                    <ApperIcon name="X" className="h-4 w-4" />
                    <span>Clear All</span>
                  </motion.button>
                )}
                
                <motion.div
                  key={resultCount}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-surface-600"
                >
                  <ApperIcon name="Home" className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {resultCount} {resultCount === 1 ? 'property' : 'properties'} found
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <button className="group px-4 py-2 bg-white rounded-full shadow-card hover:shadow-card-hover transition-all border border-surface-100 flex items-center space-x-2">
          <ApperIcon name="MapPin" className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-surface-700">Map View</span>
          <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Coming Soon</span>
        </button>

        <button className="group px-4 py-2 bg-white rounded-full shadow-card hover:shadow-card-hover transition-all border border-surface-100 flex items-center space-x-2">
          <ApperIcon name="Calculator" className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-surface-700">Mortgage Calculator</span>
          <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Coming Soon</span>
        </button>

        <button className="group px-4 py-2 bg-white rounded-full shadow-card hover:shadow-card-hover transition-all border border-surface-100 flex items-center space-x-2">
          <ApperIcon name="Users" className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-surface-700">Find Agent</span>
          <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Coming Soon</span>
        </button>
      </motion.div>
    </div>
  )
}

export default MainFeature