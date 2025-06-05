import React from 'react';
      import Icon from './Icon';

      const Input = ({ 
        type = 'text', 
        placeholder, 
        value, 
        onChange, 
        className = '', 
        iconName,
        ...props 
      }) => {
        const inputClasses = `w-full px-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none ${
          iconName ? 'pl-12' : ''
        } ${className}`;

        return (
          <div className="relative">
            {iconName && (
              <Icon 
                name={iconName} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" 
              />
            )}
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={inputClasses}
              {...props}
            />
          </div>
        );
      };

      export default Input;