const paths = {
  home() {
    return '/';
  },
  profile() {
    return '/profile'
  },
  messages() {
    return '/messages'
  },
  properties(page?: number) {
    return page ? `/properties?page=${page}` : '/properties';
  },
  propertiesSaved() {
    return '/properties/saved';
  },
  propertiesSearch(location: string, propertyType: string) {
    return `/properties/search-results?location=${location}&propertyType=${propertyType}`;
  },
  propertyAdd() {
    return '/properties/add';
  },
  propertyDetails(propertyId: string) {
    return `/properties/${propertyId}`;
  },
  propertyEdit(propertyId: string) {
    return `/properties/${propertyId}/edit`;
  },
};

export default paths;
