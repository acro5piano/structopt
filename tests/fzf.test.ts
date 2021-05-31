import test from 'ava'
import { StructOpt, Option, fromArray } from '../src'

@StructOpt()
class FzfArgs {
  @Option({ long: true, defaultValue: 'v2' })
  algo!: string
}

test('GrepArgs - short', (t) => {
  const res = fromArray(FzfArgs, [])
  t.deepEqual(res, {
    algo: 'v2',
  })
})
