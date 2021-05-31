export class ValidationError extends Error {
  properties: string[]

  constructor(message: string, properties: string[]) {
    super(message)
    this.message = message
    this.properties = properties
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export class UnexpectedArgsError extends Error {
  constructor(message: string) {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, UnexpectedArgsError.prototype)
  }
}
