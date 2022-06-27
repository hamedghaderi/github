import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

export function useDate() {
  dayjs.extend(calendar)

  const lastWeek = dayjs(Date.now()).subtract(1, 'week').format('YYYY-MM-DD')

  return {
    lastWeek,
  }
}
