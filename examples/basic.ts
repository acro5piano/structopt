import { StructOpt, Option, fromArgs } from '../src'

@StructOpt({
  name: 'example',
  about: 'An example of StructOpt usage.',
  version: '0.1.5',
})
class Opt {
  // short and long flags (-d, --debug) will be deduced from the field's name
  @Option({ description: 'Activate debug mode', short: true, long: true })
  debug!: boolean

  // we don't want to name it "speed", need to look smart
  @Option({ description: 'Set speed', short: '-v', long: '--velocity', defaultValue: '42' })
  speed!: number

  @Option({ description: 'search pattern', required: true })
  input!: string

  @Option({ description: 'Output file, stdout if not present' })
  output?: string
}

const opt = fromArgs(Opt)
console.log(opt)
