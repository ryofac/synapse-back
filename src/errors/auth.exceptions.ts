import { HttpExcpetion } from "./http.exception";

export class UnauthorizedException extends HttpExcpetion {
  constructor() {
    super("Unauthorized access - please log in", 401, "UNAUTHORIZED");
  }
}

export class InvalidCredentialsException extends HttpExcpetion {
  constructor() {
    super(
      "Invalid credentials - please check your username and password",
      401,
      "INVALID_CREDENTIALS"
    );
  }
}

export class AccessTokenExpiredException extends HttpExcpetion {
  constructor() {
    super(
      "Access token is invalid or has expired - refresh or log in again",
      401,
      "ACCESS_TOKEN_EXPIRED"
    );
  }
}

export class RefreshTokenExpired extends HttpExcpetion {
  constructor() {
    super(
      "Refresh token is invalid or has expired - please log in again",
      401,
      "REFRESH_TOKEN_EXPIRED"
    );
  }
}

export class InsufficientPermissionsException extends HttpExcpetion {
  constructor() {
    super(
      "Insufficient permissions to access this resource",
      403,
      "PERMISSION_DENIED"
    );
  }
}
