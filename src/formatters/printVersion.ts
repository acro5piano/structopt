import { StructOptImpl } from '../StructOptImpl'

export function printVersion<T>(structOptImpl: StructOptImpl<T>) {
  return `${structOptImpl.name} ${structOptImpl.version}`
}
