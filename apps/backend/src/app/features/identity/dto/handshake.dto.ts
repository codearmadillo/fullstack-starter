export interface HandshakeRequestDto {
  login: string;
  token: string;
}
export interface HandshakeResponseDto {
  accessToken: string;
  refreshToken: string;
}
