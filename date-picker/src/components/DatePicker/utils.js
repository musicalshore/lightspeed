export const getMonthString = (n) => {
  switch (n) {
    case 0: return 'Jan'
    case 1: return 'Feb'
    case 2: return 'Mar'
    case 3: return 'Apr'
    case 4: return 'May'
    case 5: return 'Jun'
    case 6: return 'Jul'
    case 7: return 'Aug'
    case 8: return 'Sep'
    case 9: return 'Oct'
    case 10: return 'Nov'
    case 11: return 'Dec'
  }
}

export const subtractDays = (date, amount) => {
  const tempDate = new Date(date)
  tempDate.setDate(tempDate.getDate() - amount)
  return tempDate
}

export const getDateString = (date) => `${getMonthString(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`

export const validateDate = (date) => {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (!isNaN(date.getTime())) {
      return true
    }
  }
  return false
}

export const formatDate = (value) => {
  let result = ''
  const matches = value.match(/([0-9]+)/g) || []
  if (matches[0]) {
    result += matches[0] + (matches[0].length === 2 ? '-' : '')
  }
  if (matches[1]) {
    result += matches[1] + (matches[1].length === 2 ? '-' : '')
  }
  if (matches[2]) {
    result += matches[2].substring(0, 4)
  }

  return result
}

// This needs work
export const validateDateString = (value) => {
  const date = value.split('-')
  if (date.length !== 3) {
    return false
  }

  return validateDate(new Date(date[2], date[0] - 1, date[1] - 1))
}
