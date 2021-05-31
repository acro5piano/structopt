import { Instance, IStructOpt, IOption } from './interfaces'
import { basename } from 'path'

export class StructOptImpl<T> {
  key: string
  name: string
  about: string
  version: string
  options: IOption[] = []
  type!: T

  constructor({ key, name, about, version }: IStructOpt) {
    this.key = key
    this.name = name || key
    this.about = about || ''
    this.version = version || ''
  }

  addOption(option: IOption) {
    this.options.push(option)
  }

  parse([x, ...xs]: string[], parsed = {}): Instance<T> {
    if (x === undefined) {
      return parsed as any
    }
    const longMatched = /--[a-z|A-Z|0-9|-|_]+/.test(x)
    const shortMatched = /-[a-z|A-Z|0-9]/.test(x)
    if (shortMatched || longMatched) {
      const option = this.options.find((o) => {
        if (longMatched) {
          return o.long === x
        } else {
          return o.short === x
        }
      })
      if (!option) {
        throw new Error(
          `Found argument '${x}' which wasn't expected, or isn't valid in this context`,
        )
      }
      const [value, ...rest] = xs
      if (option.type === 'boolean') {
        if (value === 'false') {
          return this.parse(rest, {
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
    const [positionOption] = this.options.filter(
      (o) => !o.short && !o.long && !Object.keys(parsed).includes(o.key),
    )
    if (positionOption) {
      return this.parse(xs, {
        ...parsed,
        [positionOption.key]: x,
      })
    }
    return this.parse(xs, parsed)
  }

  printHelp() {
    console.log(`${this.name} ${this.version || ''}
${this.about}
USAGE:
  ${basename(process.argv[1]!)}
`)
  }
}
