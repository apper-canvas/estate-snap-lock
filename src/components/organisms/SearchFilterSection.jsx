import React from 'react';
      import { motion } from 'framer-motion';
      import SearchBar from '../molecules/SearchBar';
      import AdvancedFilters from './AdvancedFilters';

      const SearchFilterSection = ({ 
        filters, 
        setFilters, 
        clearFilters, 
        resultCount, 
        showAdvancedFilters, 
        setShowAdvancedFilters 
      }) => {
        const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa'];
        const bedroomOptions = [1, 2, 3, 4, 5];

        const handleFilterChange = (key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
        };

        const hasActiveFilters = Object.values(filters).some(value => value !== '');

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-card p-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <SearchBar
                filters={filters}
                handleFilterChange={handleFilterChange}
                propertyTypes={propertyTypes}
                bedroomOptions={bedroomOptions}
              />
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
                <img src="/ApperIcon.jsx" alt="" className="h-5 w-5" /> {/* Placeholder for ApperIcon */}
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
            </div>

            <AdvancedFilters
              showAdvancedFilters={showAdvancedFilters}
              filters={filters}
              handleFilterChange={handleFilterChange}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              resultCount={resultCount}
            />
          </motion.div>
        );
      };

      export default SearchFilterSection;