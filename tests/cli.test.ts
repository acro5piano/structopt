import { StructOpt, Option, fromArray } from '../src'
import test from 'ava'

@StructOpt({
  name: 'example',
  about: 'An example of StructOpt usage.',
})
class Opt {
  // Activate debug mode
  @Option({ short: '-d', long: '--debug' })
  debug!: boolean

  // Set speed
  // we don't want to name it "speed", need to look smart
  @Option({ short: '-v', long: '--velocity', defaultValue: '42' })
  speed!: number

  // Input file
  @Option()
  input!: string

  // Output file, stdout if not present
  @Option({ nullable: true })
  output?: string

  // Where to write the output: to `stdout` or `file`
  @Option({ short: '-o' })
  outType!: string
}

test('StructOpt - short', (t) => {
  t.deepEqual(fromArray(Opt, ['-d', '-v', '42', 'test.mp4', '-o', 'file', '/tmp/output.mp4']), {
    debug: true,
    speed: 42,
    input: 'test.mp4',
    outType: 'file',
    output: '/tmp/output.mp4',
  })
})

test('StructOpt - long', (t) => {
  t.deepEqual(
    fromArray(Opt, ['--debug', '--velocity', '42', 'test.mp4', '-o', 'file', '/tmp/output.mp4']),
    {
      debug: true,
      speed: 42,
      input: 'test.mp4',
      outType: 'file',
      output: '/tmp/output.mp4',
    },
  )
})
