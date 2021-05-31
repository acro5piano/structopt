import { findStructOpt } from './registry/structOptRegistry'
import { Instance } from './interfaces'

export function fromArgs(Opt: Function) {
  return fromArray(Opt, process.argv.slice(2))
}

export function fromArray<T extends Function>(Opt: T, array: string[]): Instance<T> {
  const structOpt = findStructOpt<T>(Opt.name)
  if (!structOpt) {
    throw new Error(`Can't find StructOpt by name: ${Opt.name}`)
  }
  if (array.includes('-h') || array.includes('--help')) {
    structOpt.printHelp()
    process.exit(0)
  }
  return structOpt.parse(array)
}
