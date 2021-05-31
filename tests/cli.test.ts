import { StructOpt, Option, fromArray } from '../src'
import test from 'ava'

@StructOpt({
  name: 'example',
  about: 'An example of StructOpt usage.',
})
class Opt {
  @Option({ short: true, long: true })
  debug!: boolean

  @Option({ short: '-v', long: '--velocity', defaultValue: '42' })
  speed!: number

  @Option()
  input!: string

  @Option({ nullable: true })
  output?: string
}

test('StructOpt - short', (t) => {
  t.deepEqual(fromArray(Opt, ['-d', '-v', '42', 'test.mp4', '/tmp/output.mp4']), {
    debug: true,
    speed: 42,
    input: 'test.mp4',
    output: '/tmp/output.mp4',
  })
})

test('StructOpt - optional', (t) => {
  t.deepEqual(fromArray(Opt, ['-d', '-v', '42', 'test.mp4']), {
    debug: true,
    speed: 42,
    input: 'test.mp4',
  })
})

test('StructOpt - long', (t) => {
  t.deepEqual(fromArray(Opt, ['--debug', '--velocity', '42', 'test.mp4', '/tmp/output.mp4']), {
    debug: true,
    speed: 42,
    input: 'test.mp4',
    output: '/tmp/output.mp4',
  })
})
