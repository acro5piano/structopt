import { IStructOpt, IOption } from './interfaces'

export class StructOptImpl {
  key: string
  name?: string
  about?: string
  options: IOption[] = []

  constructor({ key, name, about }: IStructOpt) {
    this.key = key
    this.name = name
    this.about = about
  }

  addOption(option: IOption) {
    this.options.push(option)
  }

  parse(array: any[]) {
    console.log(this)
    console.log(array)
  }
}
