import React from 'react';
      import Input from '../atoms/Input';
      import Label from '../atoms/Label';

      const FilterInput = ({ label, placeholder, value, onChange, type = 'text', className = '' }) => {
        return (
          <div className={className}>
            <Label>{label}</Label>
            <Input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </div>
        );
      };

      export default FilterInput;