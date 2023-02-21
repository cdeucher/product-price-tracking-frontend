import { environment } from '../environments/environment';
export const GB = Object.freeze({
  BASE_API_URL: environment.apiEndPoint,
  REDIRECT_URL: environment.redirectUrl,
  CLIENT_ID: environment.clientId,
  COGNITO_DOMAIN: environment.cognitoDomain,
  REGION: environment.region,
  TOKEN: '',
});
