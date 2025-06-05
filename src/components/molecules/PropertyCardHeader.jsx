import React from 'react';
      import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const PropertyCardHeader = ({ price, isFavorite, onToggleFavorite, imageUrl, title }) => {
        return (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 gradient-overlay"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="text-white">
                <Text as="div" className="text-2xl font-bold font-heading">
                  ${price.toLocaleString()}
                </Text>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleFavorite}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
              >
                <Icon
                  name="Heart"
                  className={`h-5 w-5 ${isFavorite ? 'text-accent fill-current' : 'text-white'}`}
                />
              </motion.button>
            </div>
          </div>
        );
      };

      export default PropertyCardHeader;