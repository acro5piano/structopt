import 'reflect-metadata'
import { StructOptImpl } from './StructOptImpl'
import { IStructOpt, IOption } from './interfaces'
import { addStructOpt } from './registry/structOptRegistry'
import { addThunk, flushThunk } from './registry/thunkRegistry'
import { instanceToPrimitiveType } from './utils'

export function StructOpt(args: Omit<IStructOpt, 'key'>) {
  return function (constructor: Function) {
    const structOpt = new StructOptImpl({ ...args, key: constructor.name })
    addStructOpt(structOpt)
    flushThunk(structOpt)
  }
}

export function Option(args: Omit<IOption, 'key' | 'type'> = {}) {
  return function (target: any, propertyKey: string) {
    const typeInstance = Reflect.getMetadata('design:type', target, propertyKey)
    addThunk((structOpt: StructOptImpl) => {
      structOpt.addOption({
        ...args,
        key: propertyKey,
        type: instanceToPrimitiveType(typeInstance),
      })
    })
  }
}
