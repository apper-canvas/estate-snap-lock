import React from 'react';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';
      import HeroSection from '../organisms/HeroSection';
      import SearchFilterSection from '../organisms/SearchFilterSection';
      import PropertyGrid from '../organisms/PropertyGrid';
      import QuickActions from '../organisms/QuickActions';
      import FavoriteSidebar from '../organisms/FavoriteSidebar';

      const HomePageTemplate = ({
        properties,
        loading,
        error,
        favorites,
        showFavorites,
        setShowFavorites,
        filters,
        setFilters,
        filteredProperties,
        toggleFavorite,
        clearFilters,
        favoriteProperties,
      }) => {
        if (error) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <Icon name="AlertTriangle" className="h-12 w-12 text-accent mx-auto mb-4" />
                <Text as="h2" className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</Text>
                <Text as="p" className="text-gray-600">{error}</Text>
              </div>
            </div>
          );
        }

        const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

        return (
          <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-surface-200 shadow-soft">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                        <Icon name="Home" className="h-6 w-6 text-white" />
                      </div>
                      <Text as="h1" className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        EstateSnap
                      </Text>
                    </div>
                  </div>

                  <nav className="hidden md:flex space-x-8">
                    <a href="#" className="text-surface-600 hover:text-primary transition-colors">Buy</a>
                    <a href="#" className="text-surface-600 hover:text-primary transition-colors">Rent</a>
                    <a href="#" className="text-surface-600 hover:text-primary transition-colors">Agents</a>
                    <a href="#" className="text-surface-600 hover:text-primary transition-colors">About</a>
                  </nav>

                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => setShowFavorites(!showFavorites)}
                      className="relative p-2 text-surface-600 hover:text-primary transition-colors"
                      variant="ghost"
                    >
                      <Icon name="Heart" className="h-6 w-6" />
                      {favorites.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                          {favorites.length}
                        </span>
                      )}
                    </Button>
                    <Button className="md:hidden p-2 text-surface-600 hover:text-primary transition-colors" variant="ghost">
                      <Icon name="Menu" className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <HeroSection />
              <SearchFilterSection
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
                resultCount={filteredProperties.length}
                showAdvancedFilters={showAdvancedFilters}
                setShowAdvancedFilters={setShowAdvancedFilters}
              />
              <QuickActions />
              <div className="mt-8">
                <PropertyGrid
                  properties={filteredProperties}
                  loading={loading}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  clearFilters={clearFilters}
                />
              </div>
            </main>

            <FavoriteSidebar
              showFavorites={showFavorites}
              onClose={() => setShowFavorites(false)}
              favoriteProperties={favoriteProperties}
              toggleFavorite={toggleFavorite}
            />
          </div>
        );
      };

      export default HomePageTemplate;