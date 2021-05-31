export class ValidationError extends Error {
  properties: string[]

  constructor(message: string, properties: string[]) {
    super(message)
    this.message = message
    this.properties = properties
  }
}
