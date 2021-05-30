import { Program } from './Program'
import { Param, ParamArgs } from './Param'
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

export function Option(args: ParamArgs) {
  return function (_target: any, propertyKey: string) {
    addThunk(() => {
      program.options.push(new Param({ key: propertyKey }))
    })
  }
}
