import React from 'react';
      import Badge from '../atoms/Badge';
      import Button from '../atoms/Button';

      const PropertyCardFooter = ({ propertyType, onViewDetails }) => {
        return (
          <div className="mt-4 flex items-center justify-between">
            <Badge className="bg-secondary/10 text-secondary">
              {propertyType}
            </Badge>
            <Button 
              variant="ghost" 
              onClick={onViewDetails} 
              className="text-primary hover:text-secondary text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </Button>
          </div>
        );
      };

      export default PropertyCardFooter;