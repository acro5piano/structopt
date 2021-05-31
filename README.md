[![test](https://github.com/acro5piano/structopt/actions/workflows/test.yml/badge.svg)](https://github.com/acro5piano/structopt/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/structopt.svg)](https://badge.fury.io/js/structopt)

# structopt

Decorator-based CLI option parser

# Install

```
npm install --save structopt
```

Or if you use Yarn:

```
yarn add structopt
```

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
}

function main() {
  const opt = fromArgs(Opt)
  console.log(opt)
}
```
