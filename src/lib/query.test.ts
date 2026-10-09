import { describe, expect, it } from 'vitest'
import { bersihkanKataKunci, compactParams, parseOffset } from './query'

describe('bersihkanKataKunci', () => {
  it('membuang karakter yang merusak filter PostgREST', () => {
    expect(bersihkanKataKunci('a(b),c*d%e\\f')).toBe('a b  c d e f')
  })

  it('aman untuk null dan undefined', () => {
    expect(bersihkanKataKunci(null)).toBe('')
    expect(bersihkanKataKunci(undefined)).toBe('')
  })

  it('memangkas spasi tepi', () => {
    expect(bersihkanKataKunci('  warung  ')).toBe('warung')
  })
})

describe('parseOffset', () => {
  it.each([
    [null, 0],
    ['25', 25],
    ['-5', 0],
    ['abc', 0],
    ['12.9', 12]
  ])('parseOffset(%s) = %s', (input, expected) => {
    expect(parseOffset(input)).toBe(expected)
  })
})

describe('compactParams', () => {
  it('membuang nilai kosong, null, undefined, dan 0', () => {
    expect(compactParams({ a: 'x', b: '', c: null, d: undefined, e: 0, f: 3 })).toEqual({ a: 'x', f: '3' })
  })
})
