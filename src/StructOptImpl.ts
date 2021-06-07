import { Instance, IStructOpt, IOption } from './interfaces'
import { ValidationError, UnexpectedArgsError } from './errors'

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
      for (const option of this.options) {
        if (option.defaultValue !== undefined && (parsed as any)[option.key] === undefined) {
          ;(parsed as any)[option.key] = option.defaultValue
        }
      }
      return parsed as any
    }
    const longMatched = /^--[a-z|A-Z|0-9|-|_]+/.test(x)
    const shortMatched = /^-[a-z|A-Z|0-9]/.test(x)
    if (shortMatched || longMatched) {
      const option = this.options.find((o) => {
        if (longMatched) {
          return o.long === x
        } else {
          return o.short === x
        }
      })
      if (!option) {
        throw new UnexpectedArgsError(
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

  validate(result: Instance<T>) {
    for (const option of this.options) {
      if ((result as any)[option.key] === undefined) {
        if (option.required) {
          throw new ValidationError(`The following required arguments were not provided`, [
            option.key,
          ])
        }
        if (option.requiredIf && option.requiredIf(result)) {
          throw new ValidationError(`The following required arguments were not provided`, [
            option.key,
          ])
        }
      }
    }
  }
}
