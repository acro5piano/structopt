import chalk from 'chalk'
import { ValidationError } from './errors'
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
    console.log(structOpt.printHelp())
    process.exit(0)
  }
  const result = structOpt.parse(array)
  try {
    structOpt.validate(result)
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log(chalk.red`error: ${e.message}`)
      for (const prop of e.properties) {
        console.log(chalk.red`    ${prop}`)
      }
      console.log('')
      console.log(structOpt.printHelp())
      process.exit(1)
    }
    throw e
  }
  return result
}
