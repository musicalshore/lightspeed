import {subtractDays, getDateString, validateDate, validateDateString, formatDate} from '../utils'

describe('utils', () => {
  describe('subtractDays', () => {
    it('should return today', () => {
      const today = new Date()
      expect(subtractDays(today, 0).toDateString()).toBe(today.toDateString())
    })
    it('should return seven days before end', () => {
      const endDate = new Date(2017, 0, 1)
      const expected = new Date(2016, 11, 26)
      expect(subtractDays(endDate, 6).toDateString()).toBe(expected.toDateString())
    })
    it('should return thirty days before end', () => {
      const endDate = new Date(2017, 0, 31)
      const expected = new Date(2017, 0, 2)
      expect(subtractDays(endDate, 29).toDateString()).toBe(expected.toDateString())
    })
  })

  describe('getDateString', () => {
    it('should format a date like `MMM dd, yyyy`', () => {
      expect(getDateString(new Date(2017, 6, 15))).toBe('Jul 15, 2017')
    })
  })

  describe('validateDate', () => {
    it('should validate a date', () => {
      expect(validateDate(new Date())).toBe(true)
    })
    it('should invalidate a bad date', () => {
      expect(validateDate(new Date('foo'))).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('should format a date correctly', () => {
      expect(formatDate('foo')).toBe('')
      expect(formatDate('9')).toBe('9')
      expect(formatDate('92')).toBe('92-')
      expect(formatDate('92foo')).toBe('92-')
      expect(formatDate('92-12')).toBe('92-12-')
      expect(formatDate('92-12-2')).toBe('92-12-2')
      expect(formatDate('92-12-2111')).toBe('92-12-2111')
      expect(formatDate('92-12-21111')).toBe('92-12-2111')
    })
  })

  describe('validateDateString', () => {
    it('should validate a dateString correctly', () => {
      expect(validateDateString('99-99-9999')).toBe(false)
    })
  })
})
