import test from 'ava'
import { StructOpt, Option, findStructOpt } from '../src'

@StructOpt({
  name: 'grep',
  about: 'Search for PATTERNS in each FILE.',
  version: '0.1.5',
})
class GrepArgs {
  @Option({
    short: '-E',
    long: true,
    nullable: true,
    description: 'PATTERNS are extended regular expressions',
  })
  extendedRegexp!: boolean

  @Option({ short: true, long: true, nullable: true, description: 'stop after NUM selected lines' })
  maxCount!: number

  @Option({ long: true, description: 'use LABEL as the standard input file name prefix' })
  label!: string

  @Option({ description: 'search pattern' })
  patterns!: string

  @Option({ description: 'search files' })
  file!: string
}

test('GrepArgs - help', (t) => {
  const structOpt = findStructOpt(GrepArgs.name)!
  t.deepEqual(
    structOpt.printHelp(),
    `grep 0.1.5
Search for PATTERNS in each FILE.

USAGE:
  subprocess.js

FLAGS:
    -E, --extended-regexp    PATTERNS are extended regular expressions

OPTIONS:
    -m, --max-count <maxCount>    stop after NUM selected lines
        --label <label>           use LABEL as the standard input file name prefix

ARGS:
    <patterns>    search pattern
    <file>        search files
`,
  )
})
