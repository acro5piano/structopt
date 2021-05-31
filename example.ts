import { StructOpt, Option, fromArgs } from './src'

@StructOpt({
  name: 'example',
  about: 'An example of StructOpt usage.',
})
class Opt {
  // Activate debug mode
  // short and long flags (-d, --debug) will be deduced from the field's name
  @Option({ short: true, long: true })
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
}

const opt = fromArgs(Opt)
console.log(opt)
