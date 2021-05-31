import { StructOptImpl } from '../StructOptImpl'

type StructOptThunk = (structOpt: StructOptImpl) => void
type Registry = Set<StructOptThunk>

let registry: Registry | null

function getRegistry(): Registry {
  if (!registry) {
    registry = new Set<StructOptThunk>()
  }
  return registry
}

export function addThunk(thunk: StructOptThunk) {
  getRegistry().add(thunk)
}

export function flushThunk(structOpt: StructOptImpl) {
  getRegistry().forEach((thunk) => thunk(structOpt))
  getRegistry().clear()
}
