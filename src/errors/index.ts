// Defining a custom error class for email not verified scenarios
// the class extends the built-in Error class to create a custom error type.
// This allows us to distinguish and handle errors related to email verification separately
// from other types of errors.
export class EmailNotVerifiedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EmailNotVerifiedError";
    }
}