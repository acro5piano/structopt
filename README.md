[![test](https://github.com/acro5piano/structopt/actions/workflows/test.yml/badge.svg)](https://github.com/acro5piano/structopt/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/structopt.svg)](https://badge.fury.io/js/structopt)

# structopt

Decorator-based CLI option parser

# Features

- **Strongly-Typed**: Use class to declare arguments.
- **Declarative**: Instead of chaining methods, use class to declare what arguments are needed.
- **Impressive**: Automatically infers argument name.

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
```

And run

```
ts-node example.ts --debug -v 80 input_file

// => { debug: true, speed: 80, input: 'input_file' }

```
