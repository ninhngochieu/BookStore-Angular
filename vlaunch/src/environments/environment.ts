// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CONFIG_CHECK: 'DEBUG_MOD',
  API_DOMAIN : 'https://docker-dotnet-api.herokuapp.com/api/',
  IMAGE_PATH: 'https://docker-dotnet-api.herokuapp.com/images/',
  LIMIT_TRENDING_PRODUCTS: 8,
  PRODUCTS_LIMIT: 12,
  IMG_ROOT: 'localhost:4200/assets/images'
};
