const sparkLine = require("../src/modules/sparklines.js")

describe('Allocate 3 item sparkline', () => {
  let sl

  beforeAll(() => {
    sl = sparkLine(3)
  })
  afterAll(() => {
    sl = null
  })

  test('Is not undefined', () => {
    expect(sl).not.toBeUndefined()
  })
  test('Can push values and return min and max', () => {
    sl.push(1)
    sl.push(10)
    sl.push(19)
    expect(sl.min()).toBe(1)
    expect(sl.max()).toBe(19)
  })
  test('find maximum', () => {
    sl.push(123)
    expect(sl.max()).toBe(123)
    sl.push(10)
    expect(sl.max()).toBe(123)
    sl.push(200)
    expect(sl.max()).toBe(200)
    sl.push(0)
    sl.push(5)
    expect(sl.max()).toBe(200)
    sl.push(1)
    expect(sl.max()).toBe(5)
  })
  test('find minimum', () => {
    sl.push(100)
    sl.push(100)
    sl.push(5)
    expect(sl.min()).toBe(5)
    sl.push(8)
    expect(sl.min()).toBe(5)
    sl.push(4)
    expect(sl.min()).toBe(4)
    sl.push(10)
    sl.push(20)
    expect(sl.min()).toBe(4)
    sl.push(30)
    expect(sl.min()).toBe(10)
  })
})

describe('simple graph sparklines with 2 data point', () => {
  beforeAll(() => {
    sl = sparkLine(4)
  })
  afterAll(() => {
    sl = null
  })
  test('various scales', () => {
    sl.minBottomToTop(100);
    sl.push(40)
    sl.push(60)
    expect(sl.graph(100)).toEqual([40, 60])
    sl.minBottomToTop(20)
    expect(sl.graph(100)).toEqual([0, 100])
    sl.minBottomToTop(50)
    expect(sl.graph(100)).toEqual([30, 70])
  })
})

describe('simple graph sparklines with 3 data point', () => {
  beforeAll(() => {
    sl = sparkLine(4)
  })
  afterAll(() => {
    sl = null
  })
  test('various scales', () => {
    sl.minBottomToTop(100)
    sl.push(40)
    sl.push(60)
    sl.push(50)
    expect(sl.graph(100)).toEqual([40, 60, 50])
    sl.minBottomToTop(20)
    expect(sl.graph(100)).toEqual([0, 100, 50])
    sl.minBottomToTop(50)
    expect(sl.graph(100)).toEqual([30, 70, 50])
  })
})

describe('4 data points', () => {
  beforeAll(() => {
    sl = sparkLine(4)
  })
  afterAll(() => {
    sl = null
  })
  test('automatic scaling', () => {
    sl.minBottomToTop(100)
    sl.push(50)
    sl.push(150)
    sl.push(40)
    sl.push(240)
    expect(sl.graph(100)).toEqual([5, 55, 0, 100])
    expect(sl.graph(200)).toEqual([10, 110, 0, 200])
  })
  test('enforced scaling', () => {
    sl.minBottomToTop(100)
    sl.push(60)
    sl.push(40)
    sl.push(50)
    sl.push(40)
    expect(sl.graph(100)).toEqual([60, 40, 50, 40])
    expect(sl.graph(200)).toEqual([120, 80, 100, 80])
  })
  test('enforced scaling 2', () => {
    sl.minBottomToTop(100)
    sl.push(1)
    sl.push(0)
    sl.push(2)
    sl.push(1000)
    expect(sl.graph(100)).toEqual([0, 0, 0, 100])
    expect(sl.graph(1000)).toEqual([1, 0, 2, 1000])
  })
})