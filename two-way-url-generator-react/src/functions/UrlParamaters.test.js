import React from 'react'
import UrlParamaters from './UrlParamaters'

it('takes first item from the object and prepends it with ?', () => {
    expect(UrlParamaters.stringify({first:1})).toBe('?first=1')
})

it('takes subsequent items from the object and prepends them with &', () => {
    expect(UrlParamaters.stringify({first:1,second:2}, false)).toBe('?first=1&second=2')
    expect(UrlParamaters.stringify({first:1,second:2,third:3}, false)).toBe('?first=1&second=2&third=3')
})
