import test from 'ava'
import { StructOpt, Option, fromArray } from '../src'
import { IsUUID } from 'class-validator'

@StructOpt()
class TestArgs {
  @IsUUID()
  @Option({ long: true, defaultValue: 'da50730e-fc5a-4aea-a2ae-67f0b8d7ee83' })
  uuid!: string
}

test('class-validator - default', (t) => {
  const res = fromArray(TestArgs, [])
  t.deepEqual(res, {
    uuid: 'da50730e-fc5a-4aea-a2ae-67f0b8d7ee83',
  })
})

test('class-validator - fail', (t) => {
  t.throws(() => {
    fromArray(TestArgs, ['--uuid', 'invalid uuid'])
  })
})

test('class-validator - pass', (t) => {
  const res = fromArray(TestArgs, ['--uuid', 'ae4e2fd1-fd70-4ae5-9137-3f03d5c23133'])
  t.deepEqual(res, {
    uuid: 'ae4e2fd1-fd70-4ae5-9137-3f03d5c23133',
  })
})
