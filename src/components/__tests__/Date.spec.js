import { describe, expect, it } from 'vitest'
import { useDate } from '../../composables/Date'

describe('Date', () => {
  it('can return last week date in YYYY-MM-DD format', () => {
    const { lastWeek } = useDate()

    expect(lastWeek).match(/\d{4}-\d{2}-\d{2}/)
  })

  it('can return human readable dates', () => {
    const { hummanReadable } = useDate()

    expect(hummanReadable(Date.now())).toBe('a few seconds ago')
  })
})
