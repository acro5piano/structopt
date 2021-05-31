# structopt

WIP: Decorator-based CLI option parser

# Example

```typescript
import { StructOpt, Option, fromArgs } from 'structopt'

@StructOpt({
  name: 'example',
  about: 'An example of StructOpt usage.',
})
class Opt {
  // Activate debug mode
  // short and long flags (-d, --debug) will be deduced from the field's name
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
  @Option({ short: 'o' })
  outType!: string

  // File name: only required when `out-type` is set to `file`
  @Option({ name: 'FILE', requiredIf: ['outType', 'file'] })
  fileName?: string
}

function main() {
  const opt = fromArgs(Opt)
  console.log(opt)
}
```
