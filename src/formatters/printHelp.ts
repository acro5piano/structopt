import { basename } from 'path'
import { IOption } from '../interfaces'
import { StructOptImpl } from '../StructOptImpl'

export function printHelp<T>(structOptImpl: StructOptImpl<T>) {
  const flags = structOptImpl.options.filter((o) => o.type === 'boolean' && (o.short || o.long))
  const options = structOptImpl.options.filter(
    (o) => (o.type === 'string' || o.type === 'number') && (o.short || o.long),
  )
  const optionsMaxLength = getPrintedMaxLength(options)
  const args = structOptImpl.options.filter((o) => o.short === undefined && o.long === undefined)
  const requiredArgs = args.filter((o) => o.required)
  const optionalArgs = args.filter((o) => !o.required)
  const argsMaxLength = getPrintedMaxLength(args)

  return `${structOptImpl.name} ${structOptImpl.version || ''}
${structOptImpl.about}

USAGE:
  ${basename(process.argv[1]!)}${flags.length > 0 ? ' [FLAGS]' : ''}${
    options.length > 0 ? ' [OPTIONS]' : ''
  }${requiredArgs.map((a) => ` <${a.key}>`).join('')}${optionalArgs.length > 0 ? ' [ARGS]' : ''}

${
  flags.length > 0
    ? `FLAGS:
${flags.map((flag) => `${printFlagsLeft(flag)}    ${flag.description || ''}`).join('\n')}`
    : ''
}
${
  options.length > 0
    ? `
OPTIONS:
${options
  .map(
    (option) =>
      `${printOptionLeft(option)}${' '.repeat(
        optionsMaxLength - printOptionLeft(option).length,
      )}    ${option.description || ''}${
        option.defaultValue ? ` [default: ${option.defaultValue}]` : ''
      }`,
  )
  .join('\n')}`
    : ''
}
${
  args.length > 0
    ? `
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
    : ''
}`
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
