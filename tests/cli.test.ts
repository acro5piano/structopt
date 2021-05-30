import { StructOpt, Option, fromArgs } from '../src'
import test from 'ava'

@StructOpt({
  name: 'example',
  about: 'An example of StructOpt usage.',
})
class Opt {
  /// Activate debug mode
  // short and long flags (-d, --debug) will be deduced from the field's name
  @Option({ short: true, long: true })
  debug!: boolean

  /// Set speed
  // we don't want to name it "speed", need to look smart
  @Option({ short: 'v', long: 'velocity', defaultValue: '42' })
  speed!: number

  /// Input file
  @Option({ fromOsStr: true })
  input!: string

  /// Output file, stdout if not present
  @Option({ fromOsStr: true, nullable: true })
  output?: string

  /// Where to write the output: to `stdout` or `file`
  @Option({ short: true })
  outType!: string

  /// File name: only required when `out-type` is set to `file`
  @Option({ name: 'FILE', requiredIf: ['outType', 'file'] })
  fileName?: string
}

test('StructOpt', (t) => {
  t.deepEqual(fromArgs(Opt), {
    debug: false,
    speed: 42.0,
    input: 'test.mp4',
    output: undefined,
    out_type: 'file',
    file_name: '/tmp/output.mp4',
  })
})
