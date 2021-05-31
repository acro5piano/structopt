export interface IStructOpt {
  key: string
  name?: string
  about?: string
  version?: string
}

export interface IOption {
  defaultValue?: string
  description?: string
  fromOsStr?: boolean
  long?: string | boolean
  name?: string
  nullable?: boolean
  requiredIf?: [string, string]
  short?: string | boolean
  type: PrimitiveType
  key: string
}

export type PrimitiveType = 'boolean' | 'string' | 'number'

export type Instance<T> = T extends new () => infer C ? C : never
