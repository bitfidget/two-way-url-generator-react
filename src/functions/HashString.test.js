import React from 'react'
import HashString from './HashString'

it('takes a string and returns a hash', () => {
    expect(HashString('hello', false)).toBe('aGVsbG8=')
})

it('takes a hash and returns a string', () => {
    expect(HashString('aGVsbG8=', true)).toBe('hello')
})
