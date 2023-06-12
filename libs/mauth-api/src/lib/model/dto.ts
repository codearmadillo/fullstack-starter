export interface LoginRequestDto {
  email: string;
  returnUrl: string;
}
export interface LoginResponseDto {
  returnUrl: string;
}

export interface ExchangeRequestDto {
  login: string;
  token: string;
}
export interface ExchangeResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequestDto {
  refreshToken: string;
}
export interface RefreshResponseDto {
  accessToken: string;
  refreshToken: string;
}
