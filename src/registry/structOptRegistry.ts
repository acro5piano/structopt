import { StructOptImpl } from '../StructOptImpl'

type Registry<T> = Map<string, StructOptImpl<T>>

let registry: Registry<any> | null

function getRegistry<T>(): Registry<T> {
  if (!registry) {
    registry = new Map<string, StructOptImpl<T>>()
  }
  return registry
}

export function addStructOpt<T>(structOpt: StructOptImpl<T>) {
  getRegistry().set(structOpt.key, structOpt)
}

export function findStructOpt<T>(key: string) {
  return getRegistry<T>().get(key)
}
