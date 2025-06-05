import React from 'react';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';

      const PropertyCardInfo = ({ title, address, bedrooms, bathrooms, squareFootage }) => {
        return (
          <div className="p-6">
            <Text as="h3" className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">
              {title}
            </Text>
            <Text className="text-surface-600 mb-4">
              {address.street}, {address.city}
            </Text>

            <div className="flex items-center space-x-6 text-surface-600">
              <div className="flex items-center space-x-1">
                <Icon name="Bed" className="h-4 w-4" />
                <Text as="span" className="text-sm">{bedrooms} beds</Text>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Bath" className="h-4 w-4" />
                <Text as="span" className="text-sm">{bathrooms} baths</Text>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Square" className="h-4 w-4" />
                <Text as="span" className="text-sm">{squareFootage} sq ft</Text>
              </div>
            </div>
          </div>
        );
      };

      export default PropertyCardInfo;