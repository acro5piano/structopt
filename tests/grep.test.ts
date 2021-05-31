import test from 'ava'
import { StructOpt, Option, fromArray, findStructOpt } from '../src'

@StructOpt({
  name: 'example',
  about: 'Search for PATTERNS in each FILE.',
})
class GrepArgs {
  @Option({ short: '-E', long: true })
  extendedRegexp!: boolean

  @Option({ short: true, long: true })
  maxCount!: number

  @Option({ long: true })
  label!: string

  @Option({ description: 'search pattern', required: true })
  patterns!: string
}

test('GrepArgs - short', (t) => {
  const res = fromArray(GrepArgs, ['--max-count', '42', '-E', '--label', 'myLabel', '/test/'])
  t.deepEqual(res, {
    maxCount: 42,
    extendedRegexp: true,
    label: 'myLabel',
    patterns: '/test/',
  })

  // @ts-expect-error
  res.foobarbaz
})

test('GrepArgs - validation error', (t) => {
  const structOpt = findStructOpt(GrepArgs.name)!
  t.throws(() => {
    structOpt.validate({} as never)
  })
})
