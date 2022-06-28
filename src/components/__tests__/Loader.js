import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Loader from '../Loader.vue'

describe('Loader', () => {
  it('can load loader', () => {
    const loader = mount(Loader)

    expect(loader.findAll('animate').length).greaterThan(0)
  })
})
