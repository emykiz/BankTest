import { Error } from "mongoose";

export class AppError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

