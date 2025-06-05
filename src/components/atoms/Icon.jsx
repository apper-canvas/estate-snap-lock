import React from 'react';
      import ApperIcon from '../ApperIcon'; // Keep existing ApperIcon

      const Icon = ({ name, className = '' }) => {
        return <ApperIcon name={name} className={className} />;
      };

      export default Icon;