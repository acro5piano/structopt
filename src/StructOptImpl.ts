import { Instance, IStructOpt, IOption } from './interfaces'
import { ValidationError, UnexpectedArgsError } from './errors'
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
      if (option.required && (result as any)[option.key] === undefined) {
        throw new ValidationError(`The following required arguments were not provided`, [
          option.key,
        ])
      }
    }
  }

  printHelp() {
    const flags = this.options.filter((o) => o.type === 'boolean' && (o.short || o.long))
    const options = this.options.filter(
      (o) => (o.type === 'string' || o.type === 'number') && (o.short || o.long),
    )
    const optionsMaxLength = getPrintedMaxLength(options)
    const args = this.options.filter((o) => o.short === undefined && o.long === undefined)
    const requiredArgs = args.filter((o) => o.required)
    const optionalArgs = args.filter((o) => !o.required)
    const argsMaxLength = getPrintedMaxLength(args)

    return `${this.name} ${this.version || ''}
${this.about}

USAGE:
  ${basename(process.argv[1]!)}${flags.length > 0 ? ' [FLAGS]' : ''}${
      options.length > 0 ? ' [OPTIONS]' : ''
    }${requiredArgs.map((a) => ` <${a.key}>`).join('')}${optionalArgs.length > 0 ? ' [ARGS]' : ''}

${
  flags.length > 0 &&
  `FLAGS:
${flags.map((flag) => `${printFlagsLeft(flag)}    ${flag.description || ''}`).join('\n')}`
}
${
  options.length > 0 &&
  `
OPTIONS:
${options
  .map(
    (option) =>
      `${printOptionLeft(option)}${' '.repeat(
        optionsMaxLength - printOptionLeft(option).length,
      )}    ${option.description || ''}`,
  )
  .join('\n')}`
}
${
  args.length > 0 &&
  `
ARGS:
${args
  .map(
    (arg) =>
      `${printArgLeft(arg)}${' '.repeat(argsMaxLength - printOptionLeft(arg).length)}    ${
        arg.description || ''
      }`,
  )
  .join('\n')}
`
}`
  }
}

function printFlagsLeft(option: IOption) {
  return `    ${option.short ? `${option.short}, ` : '    '}${option.long || ''}`
}

function printOptionLeft(option: IOption) {
  return `    ${option.short ? `${option.short}, ` : '    '}${option.long || ''} <${option.key}>`
}

function printArgLeft(option: IOption) {
  return `    <${option.key}>`
}

function getPrintedMaxLength(options: IOption[]) {
  return options.reduce((max, option) => {
    if (max < printOptionLeft(option).length) {
      return printOptionLeft(option).length
    } else {
      return max
    }
  }, 0)
}
