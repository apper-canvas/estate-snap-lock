import React from 'react';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';

      const FilterButtonGroup = ({ showAdvancedFilters, onToggleAdvancedFilters, hasActiveFilters, onClearFilters, resultCount }) => {
        return (
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <Button
              onClick={onToggleAdvancedFilters}
              className={showAdvancedFilters ? 'border-primary bg-primary text-white' : 'border-surface-200 bg-white text-surface-700 hover:border-primary'}
              variant="outline"
              icon={Icon}
              iconProps={{ name: "Filter" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hidden sm:inline">Filters</span>
            </Button>

            {hasActiveFilters && (
              <Button
                onClick={onClearFilters}
                className="px-6 py-3 bg-surface-100 text-surface-700 rounded-xl hover:bg-surface-200 transition-colors font-medium flex items-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                icon={Icon}
                iconProps={{ name: "X" }}
                variant="clear"
              >
                Clear All
              </Button>
            )}
            
            <div
              key={resultCount}
              className="flex items-center text-surface-600"
            >
              <Icon name="Home" className="h-5 w-5 mr-2" />
              <span className="font-medium">
                {resultCount} {resultCount === 1 ? 'property' : 'properties'} found
              </span>
            </div>
          </div>
        );
      };

      export default FilterButtonGroup;