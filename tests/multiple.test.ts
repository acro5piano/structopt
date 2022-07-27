import test from 'ava'
import { StructOpt, Option, fromArray, findStructOpt } from '../src'

@StructOpt()
class MultipleArgs {
  @Option({ required: true })
  mode!: string

  @Option({ type: 'string' })
  files!: string[]
}

@StructOpt()
class MultipleRequiredArgs {
  @Option({ required: true })
  mode!: string

  @Option({ type: 'string', required: true })
  files!: string[]
}

test('MultipleArgs - empty', (t) => {
  const res = fromArray(MultipleArgs, ['mode'])
  t.deepEqual(res, {
    mode: 'mode',
    files: []
  })
})


test('MultipleArgs - one', (t) => {
  const res = fromArray(MultipleArgs, ['mode', 'foo'])
  t.deepEqual(res, {
    mode: 'mode',
    files: ['foo']
  })
})

test('MultipleArgs - two', (t) => {
  const res = fromArray(MultipleArgs, ['mode', 'foo', 'bar'])
  t.deepEqual(res, {
    mode: 'mode',
    files: ['foo', 'bar']
  })
})

test('MultipleArgs - required fails when positional argument is not provided', (t) => {
  const structOpt = findStructOpt(MultipleRequiredArgs.name)!
  t.throws(() => {
    structOpt.validate({
      mode: 'mode',
      files: []
    } as never)
  })
})
