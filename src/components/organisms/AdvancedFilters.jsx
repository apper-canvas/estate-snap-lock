import React from 'react';
      import { motion } from 'framer-motion';
      import FilterInput from '../molecules/FilterInput';
      import FilterButtonGroup from '../molecules/FilterButtonGroup';

      const AdvancedFilters = ({ 
        showAdvancedFilters, 
        filters, 
        handleFilterChange, 
        clearFilters, 
        hasActiveFilters, 
        resultCount 
      }) => {
        return (
          <motion.div
            initial={false}
            animate={{ height: showAdvancedFilters ? 'auto' : 0, opacity: showAdvancedFilters ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-surface-100 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FilterInput
                  label="Min Price"
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />

                <FilterInput
                  label="Max Price"
                  type="number"
                  placeholder="No limit"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />

                <div className="md:col-span-2 lg:col-span-2 flex items-end space-x-3">
                  <FilterButtonGroup
                    showAdvancedFilters={showAdvancedFilters} 
                    onToggleAdvancedFilters={() => {}} // This button group is for the parent component's toggle
                    hasActiveFilters={hasActiveFilters}
                    onClearFilters={clearFilters}
                    resultCount={resultCount}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      };

      export default AdvancedFilters;