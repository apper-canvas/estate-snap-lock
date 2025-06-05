import React from 'react';
      import { motion } from 'framer-motion';

      const Button = ({ 
        children, 
        onClick, 
        className = '', 
        variant = 'primary', 
        icon: IconComponent,
        iconPosition = 'left',
        whileHover = { scale: 1.02 },
        whileTap = { scale: 0.98 },
        ...props 
      }) => {
        let baseClasses = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200";
        
        switch (variant) {
          case 'primary':
            baseClasses += " bg-primary text-white hover:bg-primary-dark shadow-button";
            break;
          case 'secondary':
            baseClasses += " bg-secondary text-white hover:bg-secondary-dark shadow-button";
            break;
          case 'outline':
            baseClasses += " border border-surface-200 text-surface-700 hover:border-primary hover:text-primary bg-white";
            break;
          case 'ghost':
            baseClasses += " text-surface-600 hover:text-primary bg-transparent";
            break;
          case 'clear':
            baseClasses += " bg-surface-100 text-surface-700 hover:bg-surface-200";
            break;
          default:
            baseClasses += " bg-primary text-white hover:bg-primary-dark shadow-button";
        }

        const iconClasses = IconComponent ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

        return (
          <motion.button
            onClick={onClick}
            className={`${baseClasses} ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
          >
            {IconComponent && iconPosition === 'left' && <IconComponent className={`h-5 w-5 ${iconClasses}`} />}
            {children}
            {IconComponent && iconPosition === 'right' && <IconComponent className={`h-5 w-5 ${iconClasses}`} />}
          </motion.button>
        );
      };

      export default Button;