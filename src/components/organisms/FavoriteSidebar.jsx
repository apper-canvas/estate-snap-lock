import React from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';

      const FavoriteSidebar = ({ showFavorites, onClose, favoriteProperties, toggleFavorite }) => {
        return (
          <AnimatePresence>
            {showFavorites && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
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
                      <Text as="h2" className="text-xl font-semibold font-heading">
                        Favorites ({favoriteProperties.length})
                      </Text>
                      <Button
                        onClick={onClose}
                        className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                        variant="ghost"
                      >
                        <Icon name="X" className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 overflow-y-auto h-full pb-24">
                    {favoriteProperties.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="Heart" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                        <Text className="text-surface-600">No favorites yet</Text>
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
                            <Text as="h4" className="font-medium text-sm text-gray-900 truncate">
                              {property.title}
                            </Text>
                            <Text className="text-xs text-surface-600 truncate">
                              {property.address.city}
                            </Text>
                            <Text className="text-sm font-semibold text-primary">
                              ${property.price.toLocaleString()}
                            </Text>
                          </div>
                          <Button
                            onClick={() => toggleFavorite(property.id)}
                            className="p-1 hover:bg-white rounded transition-colors"
                            variant="ghost"
                          >
                            <Icon name="X" className="h-4 w-4 text-surface-400" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };

      export default FavoriteSidebar;