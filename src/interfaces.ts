export interface IStructOpt {
  key: string
  name?: string
  about?: string
}

export interface IOption {
  defaultValue?: string
  fromOsStr?: boolean
  long?: string
  name?: string
  nullable?: boolean
  requiredIf?: [string, string]
  short?: string
  type: PrimitiveType
  key: string
}

export type PrimitiveType = 'boolean' | 'string' | 'number'
