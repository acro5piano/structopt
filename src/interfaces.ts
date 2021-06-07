export interface IStructOpt {
  key: string
  name?: string
  about?: string
  version?: string
}

export interface IOption<T = any> {
  defaultValue?: string
  description?: string
  fromOsStr?: boolean
  long?: string | boolean
  name?: string
  required?: boolean
  requiredIf?: (option: T) => boolean
  short?: string | boolean
  type: PrimitiveType
  key: string
}

export type PrimitiveType = 'boolean' | 'string' | 'number'

export type Instance<T> = T extends new () => infer C ? C : never
