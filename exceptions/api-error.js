export class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthorizedError() {
    return new ApiError(401, "User not authorized");
  }
  static Badrequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
  static Badupdate(message, errors = []) {
    return new ApiError(419, message, errors);
  }
}
