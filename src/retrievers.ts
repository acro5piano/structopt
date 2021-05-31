import { findStructOpt } from './registry/structOptRegistry'

export function fromArgs(Opt: Function) {
  return fromArray(Opt, process.argv.slice(2))
}

export function fromArray(Opt: Function, array: any[]) {
  const structOpt = findStructOpt(Opt.name)
  if (!structOpt) {
    throw new Error(`Can't find StructOpt by name: ${Opt.name}`)
  }
  return structOpt.parse(array)
}
