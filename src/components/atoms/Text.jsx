import React from 'react';
      import { motion } from 'framer-motion';

      const Text = ({ children, className = '', as = 'p', animated = false, ...props }) => {
        const Component = animated ? motion[as] : as;

        if (animated) {
          return (
            <Component 
              className={className} 
              {...props}
            >
              {children}
            </Component>
          );
        }

        return (
          <Component className={className} {...props}>
            {children}
          </Component>
        );
      };

      export default Text;