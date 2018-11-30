import React from 'react'
import HashString from './HashString'

it('takes a string and returns a hash', () => {
    expect(HashString.encode('hello')).toBe('aGVsbG8=')
})

it('takes a hash and returns a string', () => {
    expect(HashString.decode('aGVsbG8=')).toBe('hello')
})
