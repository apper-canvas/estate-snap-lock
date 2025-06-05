import React from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';
      import PropertyCardHeader from '../molecules/PropertyCardHeader';
      import PropertyCardInfo from '../molecules/PropertyCardInfo';
      import PropertyCardFooter from '../molecules/PropertyCardFooter';

      const PropertyCard = ({ property, isFavorite, toggleFavorite }) => (
        <motion.div
          key={property.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
        >
          <PropertyCardHeader
            imageUrl={property.images[0]}
            title={property.title}
            price={property.price}
            isFavorite={isFavorite}
            onToggleFavorite={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
          />
          <PropertyCardInfo
            title={property.title}
            address={property.address}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            squareFootage={property.squareFootage}
          />
          <PropertyCardFooter
            propertyType={property.propertyType}
            onViewDetails={() => {
              // Implement view details logic here
              console.log('View details for property:', property.id);
            }}
          />
        </motion.div>
      );

      const PropertyGrid = ({ properties, loading, favorites, toggleFavorite, clearFilters }) => {
        if (loading) {
          return (
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
          );
        }

        if (properties.length === 0) {
          return (
            <div className="text-center py-12">
              <Icon name="Home" className="h-16 w-16 text-surface-400 mx-auto mb-4" />
              <Text as="h3" className="text-xl font-semibold text-gray-900 mb-2">No properties found</Text>
              <Text as="p" className="text-surface-600 mb-4">
                Try adjusting your search criteria or clearing filters
              </Text>
              <Button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Clear Filters
              </Button>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>
        );
      };

      export default PropertyGrid;