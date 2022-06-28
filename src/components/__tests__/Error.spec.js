import { describe, expect, it } from 'vitest'
import { useError } from '../../composables/Error'

describe('Error', () => {
  it('can display an error', () => {
    const { displayError, errorMsg } = useError()

    expect(errorMsg.value).toBe(null)

    displayError({ message: 'This is an error' })

    expect(errorMsg.value).toBe('This is an error')
  })
})
