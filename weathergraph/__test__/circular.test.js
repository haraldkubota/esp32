const circularBuffer = require("../src/circularBuffer.js")

describe('Allocate 10 item circular buffer', () => {
  let cb

  beforeEach(() => {
    cb = circularBuffer(10)
  })

  afterEach(() => {
    cb = null;
  })

  //console.log("a="+a)
  test('new circularBuffer() returns something', () => {
    expect(cb).toBeDefined()
  })
  test('check used to be zero', () => {
    expect(cb.used()).toBe(0)
  })
  test('length to be 10', () => {
    expect(cb.length()).toBe(10)
  })
});

describe('Adding values to buffer', () => {
  let cb

  beforeAll(() => {
    cb = circularBuffer(3)
  })
  afterAll(() => {
    cb = null
  })

  test('Adding one value', () => {
    cb.push(123)
    expect(cb.length()).toBe(3);
    expect(cb.used()).toBe(1);
  })
  test('Adding 2nd and 3rd and 4th value', () => {
    cb.push(18);
    expect(cb.length()).toBe(3);
    expect(cb.used()).toBe(2);

    cb.push(99);
    expect(cb.length()).toBe(3);
    expect(cb.used()).toBe(3);

    cb.push(199);
    expect(cb.length()).toBe(3);
    expect(cb.used()).toBe(3);

    cb.push(299);
    expect(cb.length()).toBe(3);
    expect(cb.used()).toBe(3);

  })
})
describe('Adding to and removing from buffer', () => {
  let cb

  beforeAll(() => {
    cb = circularBuffer(3)
  })
  afterAll(() => {
    cb = null
  })
  test('pop before push', () => {
    let a = cb.pop()
    expect(a).toBeUndefined
  })
  test('push and pop', () => {
    cb.push(123)
    let a=cb.pop()
    expect(a).toBe(123)
    expect(cb.used()).toBe(0)
  })
  test('4 push and 4 pop', () => {
    cb.push(123)
    expect(cb.readAll()).toEqual([123])
    cb.push(234)
    expect(cb.readAll()).toEqual([123, 234])
    cb.push(345)
    expect(cb.readAll()).toEqual([123, 234, 345])
    cb.push(456)
    expect(cb.readAll()).toEqual([234, 345, 456])
    expect(cb.used()).toBe(3)
    expect(cb.pop()).toBe(234)
    expect(cb.used()).toBe(2)
    expect(cb.pop()).toBe(345)
    expect(cb.used()).toBe(1)
    expect(cb.pop()).toBe(456)
    expect(cb.used()).toBe(0)
    expect(cb.pop()).toBeUndefined
    expect(cb.used()).toBe(0)
  })
  test('4 push, pop, push, pop', () => {
    cb.push(123)
    cb.push(234)
    cb.push(345)
    cb.push(456)
    expect(cb.used()).toBe(3)
    expect(cb.pop()).toBe(234)
    expect(cb.used()).toBe(2)
    cb.push(100)
    expect(cb.used()).toBe(3)
    expect(cb.pop()).toBe(345)
    expect(cb.used()).toBe(2)
    expect(cb.pop()).toBe(456)
    expect(cb.used()).toBe(1)
    expect(cb.pop()).toBe(100)
    expect(cb.used()).toBe(0)
    expect(cb.pop()).toBeUndefined
  })
})
