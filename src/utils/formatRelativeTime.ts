const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const MONTH = 30 * DAY
const YEAR = 365 * DAY

const relativeTimeFormat = new Intl.RelativeTimeFormat('en', {
  numeric: 'always',
})

const ISO_TIMESTAMP_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|([+-])(\d{2}):?(\d{2}))$/i

function parseIsoTimestamp(isoDate: string): number | null {
  const match = ISO_TIMESTAMP_PATTERN.exec(isoDate)
  if (!match) return null

  const [
    ,
    yearText,
    monthText,
    dayText,
    hourText,
    minuteText,
    secondText,
    fraction,
    ,
    offsetSign,
    offsetHourText,
    offsetMinuteText,
  ] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const hour = Number(hourText)
  const minute = Number(minuteText)
  const second = Number(secondText)
  const offsetHour = Number(offsetHourText ?? 0)
  const offsetMinute = Number(offsetMinuteText ?? 0)
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth[month - 1] ||
    hour > 23 ||
    minute > 59 ||
    second > 59 ||
    offsetHour > 14 ||
    offsetMinute > 59 ||
    (offsetHour === 14 && offsetMinute !== 0)
  ) {
    return null
  }

  const milliseconds = Number((fraction ?? '').slice(0, 3).padEnd(3, '0'))
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(hour, minute, second, milliseconds)

  const offsetInMinutes = offsetHour * 60 + offsetMinute
  const offsetDirection = offsetSign === '+' ? 1 : -1
  const timestamp = date.getTime() - offsetDirection * offsetInMinutes * MINUTE * 1000

  return Number.isFinite(timestamp) ? timestamp : null
}

/** Formats an ISO timestamp as a short relative time, such as "3 minutes ago". */
export default function formatRelativeTime(isoDate: string): string {
  const timestamp = parseIsoTimestamp(isoDate)
  if (timestamp === null) return ''

  const differenceInSeconds = (timestamp - Date.now()) / 1000
  const absoluteDifference = Math.abs(differenceInSeconds)
  const direction = differenceInSeconds < 0 ? -1 : 1

  if (absoluteDifference < 30) {
    return direction < 0 ? 'less than a minute ago' : 'in less than a minute'
  }

  if (absoluteDifference < 90) {
    return relativeTimeFormat.format(direction, 'minute')
  }

  if (absoluteDifference < 45 * MINUTE) {
    return relativeTimeFormat.format(
      direction * Math.round(absoluteDifference / MINUTE),
      'minute',
    )
  }

  if (absoluteDifference < 90 * MINUTE) {
    return direction < 0 ? 'about 1 hour ago' : 'in about 1 hour'
  }

  if (absoluteDifference < 22 * HOUR) {
    return relativeTimeFormat.format(direction * Math.round(absoluteDifference / HOUR), 'hour')
  }

  if (absoluteDifference < 36 * HOUR) {
    return relativeTimeFormat.format(direction, 'day')
  }

  if (absoluteDifference < 26 * DAY) {
    return relativeTimeFormat.format(direction * Math.round(absoluteDifference / DAY), 'day')
  }

  if (absoluteDifference < 45 * DAY) {
    return direction < 0 ? 'about 1 month ago' : 'in about 1 month'
  }

  if (absoluteDifference < 320 * DAY) {
    const months = Math.round(absoluteDifference / MONTH)
    const monthLabel = months === 1 ? 'month' : 'months'

    return direction < 0
      ? `about ${months} ${monthLabel} ago`
      : `in about ${months} ${monthLabel}`
  }

  if (absoluteDifference < 548 * DAY) {
    return direction < 0 ? 'about 1 year ago' : 'in about 1 year'
  }

  const years = Math.round(absoluteDifference / YEAR)
  const yearLabel = years === 1 ? 'year' : 'years'

  return direction < 0
    ? `over ${years} ${yearLabel} ago`
    : `in over ${years} ${yearLabel}`
}
