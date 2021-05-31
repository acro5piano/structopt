import { StructOptImpl } from './StructOptImpl'
import { IStructOpt, IOption } from './interfaces'
import { addStructOpt } from './registry/structOptRegistry'
import { addThunk, flushThunk } from './registry/thunkRegistry'

export function StructOpt(args: Omit<IStructOpt, 'key'>) {
  return function (constructor: Function) {
    const structOpt = new StructOptImpl({ ...args, key: constructor.name })
    addStructOpt(structOpt)
    flushThunk(structOpt)
  }
}

export function Option(args: Omit<IOption, 'key' | 'type'> = {}) {
  return function (_target: any, propertyKey: string) {
    addThunk((structOpt: StructOptImpl) => {
      structOpt.addOption({
        ...args,
        key: propertyKey,
        type: 'boolean',
      })
    })
  }
}
