import React from 'react';

      const Select = ({ options, value, onChange, placeholder, className = '', ...props }) => {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`px-4 py-3 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white ${className}`}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      };

      export default Select;