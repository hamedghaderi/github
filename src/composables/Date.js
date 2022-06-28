import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'

export function useDate() {
  dayjs.extend(calendar)
  dayjs.extend(relativeTime)

  const lastWeek = dayjs(Date.now()).subtract(1, 'week').format('YYYY-MM-DD')
  const hummanReadable = date => dayjs().to(date)

  return {
    lastWeek,
    hummanReadable,
  }
}
