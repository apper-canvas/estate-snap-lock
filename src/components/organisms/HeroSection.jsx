import React from 'react';
      import Text from '../atoms/Text';

      const HeroSection = () => {
        return (
          <div className="text-center mb-12">
            <Text 
              as="h1"
              animated
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6"
            >
              Find Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dream Home</span>
            </Text>
            <Text 
              as="p"
              animated
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto"
            >
              Discover the perfect property with our comprehensive real estate platform. 
              Browse thousands of listings and find your ideal home today.
            </Text>
          </div>
        );
      };

      export default HeroSection;