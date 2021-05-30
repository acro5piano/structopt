const store = new Set<Function>()

export function addThunk(thunk: Function) {
  store.add(thunk)
}

export function flushThunk() {
  store.forEach((thunk) => thunk())
  store.clear()
}
