import React from 'react';
      import Input from '../atoms/Input';
      import Select from '../atoms/Select';

      const SearchBar = ({ filters, handleFilterChange, propertyTypes, bedroomOptions }) => {
        return (
          <div className="flex flex-col lg:flex-row gap-4">
            <Input
              iconName="Search"
              type="text"
              placeholder="Search by location, property name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="flex-1"
            />

            <Select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              options={[{ value: '', label: 'Property Type' }, ...propertyTypes.map(type => ({ value: type, label: type }))]}
              className="min-w-32"
            />

            <Select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              options={[{ value: '', label: 'Bedrooms' }, ...bedroomOptions.map(num => ({ value: num, label: `${num}+ beds` }))]}
              className="min-w-32"
            />
          </div>
        );
      };

      export default SearchBar;