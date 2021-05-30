import { Param } from './Param'

export class Program {
  name?: string
  about?: string
  thunks: Function[] = []
  options: Param[] = []
}
