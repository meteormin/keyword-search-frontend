export interface PasswordGrantType {
  grantType: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

export interface RefreshTokenGrantType {
  grantType: string;
  clientId: string;
  clientSecret: string;
  refresh_token: string;
}
