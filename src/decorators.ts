import 'reflect-metadata'
import { paramCase } from 'param-case'
import { StructOptImpl } from './StructOptImpl'
import { IStructOpt, IOption } from './interfaces'
import { addStructOpt } from './registries/structOptRegistry'
import { addThunk, flushThunk } from './registries/thunkRegistry'
import { instanceToPrimitiveType, isArrayType } from './utils'

export function StructOpt(args: Omit<IStructOpt, 'key'> = {}) {
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

export type OptionsArgs<T> = Omit<IOption<T>, 'key' | 'type' | 'repeated'> & Partial<Pick<IOption<T>, 'type'>>

export function Option<T>(args: OptionsArgs<T> = {}) {
  return function (target: any, propertyKey: string) {
    if (args.short === true) {
      args.short = `-${propertyKey[0]!}`
    }
    if (args.long === true) {
      args.long = `--${paramCase(propertyKey)}`
    }
    const typeInstance = Reflect.getMetadata('design:type', target, propertyKey)
    if(isArrayType(typeInstance) !== !!args.type) {
      throw new Error('Value types must be specified for and only for repeated options.')
    }
    addThunk((structOpt: StructOptImpl<any>) => {
      structOpt.addOption({
        ...args,
        key: propertyKey,
        type: isArrayType(typeInstance) ? args.type! : instanceToPrimitiveType(typeInstance),
        repeated: isArrayType(typeInstance)
      })
    })
  }
}
