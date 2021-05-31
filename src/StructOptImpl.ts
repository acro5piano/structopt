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

  parse([x, ...xs]: string[], parsed: object = {}): object {
    if (x === undefined) {
      return parsed
    }
    if (/-[a-z|A-Z|0-9]/.test(x)) {
      const option = this.options.find((o) => o.short === x)
      if (!option) {
        throw new Error(
          `Found argument '${x}' which wasn't expected, or isn't valid in this context`,
        )
      }
      const [value, ...rest] = xs
      if (option.type === 'boolean') {
        if (value === 'false') {
          return this.parse(xs, {
            ...parsed,
            [option.key]: false,
          })
        }
        return this.parse(xs, {
          ...parsed,
          [option.key]: true,
        })
      }
      if (option.type === 'string') {
        return this.parse(rest, {
          ...parsed,
          [option.key]: value,
        })
      }
      if (option.type === 'number') {
        return this.parse(rest, {
          ...parsed,
          [option.key]: Number(value),
        })
      }
    }
    return this.parse(xs, parsed)
  }
}
