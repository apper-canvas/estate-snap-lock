import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { propertyService } from '../services';
import HomePageTemplate from '../components/templates/HomePageTemplate';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: ''
  });
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const result = await propertyService.getAll();
        setProperties(result);
        setFilteredProperties(result);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    loadProperties();

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    if (filters.search) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.address.city.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const toggleFavorite = (propertyId) => {
    const updatedFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    toast.success(
      favorites.includes(propertyId) 
        ? "Removed from favorites" 
        : "Added to favorites"
    );
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      propertyType: ''
    });
  };

  const favoriteProperties = properties.filter(property => 
    favorites.includes(property.id)
  );

  return (
    <HomePageTemplate
      properties={properties}
      loading={loading}
      error={error}
      favorites={favorites}
      showFavorites={showFavorites}
      setShowFavorites={setShowFavorites}
      filters={filters}
      setFilters={setFilters}
      filteredProperties={filteredProperties}
      toggleFavorite={toggleFavorite}
      clearFilters={clearFilters}
      favoriteProperties={favoriteProperties}
    />
  );
};

export default HomePage;