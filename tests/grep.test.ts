import test from 'ava'
import { StructOpt, Option, fromArray } from '../src'

@StructOpt({
  name: 'example',
  about: 'Search for PATTERNS in each FILE.',
})
class GrepArgs {
  @Option({ short: '-E', long: true, nullable: true })
  extendedRegexp!: boolean

  @Option({ short: true, long: true, nullable: true })
  maxCount!: number

  @Option({ long: true })
  label!: string
}

test('GrepArgs - short', (t) => {
  t.deepEqual(fromArray(GrepArgs, ['--max-count', '42', '-E', '--label', 'myLabel']), {
    maxCount: 42,
    extendedRegexp: true,
    label: 'myLabel',
  })

  const args = fromArray(GrepArgs, ['--max-count', '42', '-E', '--label', 'myLabel'])
  // @ts-expect-error
  args.foobarbaz
})

test('GrepArgs - help', (t) => {
  t.deepEqual(fromArray(GrepArgs, ['-h']), {
    maxCount: 42,
    extendedRegexp: true,
    label: 'myLabel',
  })

  const args = fromArray(GrepArgs, ['--max-count', '42', '-E', '--label', 'myLabel'])
  // @ts-expect-error
  args.foobarbaz
})
