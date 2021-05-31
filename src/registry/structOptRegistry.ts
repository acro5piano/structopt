import { StructOptImpl } from '../StructOptImpl'

type Registry = Map<string, StructOptImpl>

let registry: Registry | null

function getRegistry(): Registry {
  if (!registry) {
    registry = new Map<string, StructOptImpl>()
  }
  return registry
}

export function addStructOpt(structOpt: StructOptImpl) {
  getRegistry().set(structOpt.key, structOpt)
}

export function findStructOpt(key: string) {
  return getRegistry().get(key)
}
