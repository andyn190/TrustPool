import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angular-6-social-login";
import { env } from 'process';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(env.GOOGLE_CLIENT_ID)
  }]);

  return config;
}