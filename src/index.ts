import { paramCase } from 'param-case'
import { Program } from './Program'
import { Param } from './Param'
import { addThunk, flushThunk } from './thunk'

const program = new Program()

interface StructOptArgs {
  name?: string
  about?: string
}

export function StructOpt(args: StructOptArgs) {
  program.name = args.name
  program.about = args.about
  flushThunk()
  return function (_constructor: Function) {}
}

interface OptionArgs {
  defaultValue?: string
  fromOsStr?: boolean
  long?: boolean | string
  name?: string
  nullable?: boolean
  requiredIf?: [string, string]
  short?: boolean | string
}

export function Option(args: OptionArgs) {
  return function (_target: any, propertyKey: string) {
    addThunk(() => {
      program.options.push(new Param(propertyKey))
    })
  }
}

export function fromArgs(Opt: any) {
  return {
    debug: false,
  }
}
