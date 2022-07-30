import { PrimitiveType } from './interfaces'

export function instanceToPrimitiveType(
  instance: new () => Number | String | Boolean,
): PrimitiveType {
  if (instance === Number) {
    return 'number'
  }
  if (instance === String) {
    return 'string'
  }
  if (instance === Boolean) {
    return 'boolean'
  }
  throw new Error(`Can't infer type: ${instance}`)
}

export function isArrayType(
  instance: new () => unknown
) {
  return instance === Array
}