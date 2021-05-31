import 'reflect-metadata'
import { paramCase } from 'param-case'
import { StructOptImpl } from './StructOptImpl'
import { IStructOpt, IOption } from './interfaces'
import { addStructOpt } from './registry/structOptRegistry'
import { addThunk, flushThunk } from './registry/thunkRegistry'
import { instanceToPrimitiveType } from './utils'

export function StructOpt(args: Omit<IStructOpt, 'key'>) {
  return function (constructor: Function) {
    const structOpt = new StructOptImpl({
      ...args,
      key: constructor.name,
      name: args.name,
    })
    addStructOpt(structOpt)
    flushThunk(structOpt)
  }
}

export function Option(args: Omit<IOption, 'key' | 'type'> = {}) {
  return function (target: any, propertyKey: string) {
    if (args.short === true) {
      args.short = `-${propertyKey[0]!}`
    }
    if (args.long === true) {
      args.long = `--${paramCase(propertyKey)}`
    }
    const typeInstance = Reflect.getMetadata('design:type', target, propertyKey)
    addThunk((structOpt: StructOptImpl<any>) => {
      structOpt.addOption({
        ...args,
        key: propertyKey,
        type: instanceToPrimitiveType(typeInstance),
      })
    })
  }
}
