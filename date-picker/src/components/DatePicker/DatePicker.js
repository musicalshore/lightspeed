import './styles.css'
import {func, object, string} from 'prop-types'
import React from 'react'
import {subtractDays, getDateString, validateDate, formatDate, validateDateString} from './utils'

export const DateRange = class DateRange extends React.Component {
  static propTypes = {
    startDate: object,
    endDate: object,
    onActivate: func.isRequired
  }

  static defaultProps = {
    startDate: {},
    endDate: {}
  }

  render () {
    let dateRangeString
    const {startDate, endDate, onActivate} = this.props
    if (validateDate(startDate) && validateDate(endDate)) {
      dateRangeString = `${getDateString(startDate)} - ${getDateString(endDate)}`
    } else {
      dateRangeString = ''
    }
    return (
      <div styleName="date-range-container" onClick={onActivate}>
        <div styleName="calendar-icon">
          <i className="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <div styleName="date-range">
          {dateRangeString}
        </div>
      </div>
    )
  }
}

const DatePicker = class DatePicker extends React.Component {
  static propTypes = {
    startDateValue: object,
    endDateValue: object,
    callback: func
  }

  state = {
    isOpen: false,
    startDateStringError: false,
    endDateStringError: false
  }

  constructor (props) {
    super(props)

    if (props.startDateValue && !validateDate(props.startDateValue)) {
      throw new Error('startDateValue is not a valid date.')
    }

    if (props.endDateValue && !validateDate(props.endDateValue)) {
      throw new Error('endDateValue is not a valid date.')
    }

    this.today = this.setDateRangeByCount.bind(this, 0)
    this.lastSevenDays = this.setDateRangeByCount.bind(this, 6)
    this.lastThirtyDays = this.setDateRangeByCount.bind(this, 29)

    this.state = {
      startDateValue: props.startDateValue,
      endDateValue: props.endDateValue,
      startDateString: '',
      endDateString: ''
    }
  }

  onActivatePicker = () => {
    this.setState({
      isOpen: true
    })
  }

  handleStartDateStringChange = (e) => {
    e.preventDefault()
    this.setState({
      startDateString: formatDate(e.target.value)
    })
  }
  handleEndDateStringChange = (e) => {
    e.preventDefault()
    this.setState({
      endDateString: formatDate(e.target.value)
    })
  }

  setDateRangeByCount = (count) => {
    const endDate = new Date()
    const startDate = subtractDays(endDate, count)
    this.setState({
      startDateValue: startDate,
      endDateValue: endDate,
      isOpen: false
    })
    if (this.props.callback && typeof this.props.callback === 'function') {
      this.props.callback(startDate, endDate)
    }
  }

  onApplyCustomDates = (e) => {
    e.preventDefault()
    const {startDateString, endDateString} = this.state
    const startDateStringError = !validateDateString(startDateString)
    const endDateStringError = !validateDateString(endDateString)
    let startDateValue
    let endDateValue
    let startDate
    let endDate
    let newState = {
      startDateStringError,
      endDateStringError,
      isOpen: startDateStringError || endDateStringError
    }

    if (!startDateStringError && !endDateStringError) {
      startDate = startDateString.split('-')
      endDate = endDateString.split('-')
      startDateValue = new Date(startDate[2], startDate[0] - 1, startDate[1] - 1)
      endDateValue = new Date(endDate[2], endDate[0] - 1, endDate[1] - 1)
      newState = Object.assign({}, newState, {
        startDateValue,
        endDateValue
      })
      if (this.props.callback && typeof this.props.callback === 'function') {
        this.props.callback(startDateValue, endDateValue)
      }
    }

    this.setState(newState)
  }
  componentWillReceiveProps (nextProps) {

  }
  render () {
    const {startDateValue, endDateValue, startDateString, endDateString, startDateStringError, endDateStringError} = this.state
    return (
      <div styleName="container">
        <DateRange startDate={startDateValue}
          endDate={endDateValue}
          onActivate={this.onActivatePicker}
        />
        {this.state.isOpen &&
          <div styleName="date-picker-container">
            <button type="button" onClick={this.today}>Today</button>
            <button type="button" onClick={this.lastSevenDays}>Last 7 Days</button>
            <button type="button" onClick={this.lastThirtyDays}>Last 30 Days</button>
            <div styleName="custom-dates-header">
              <h4>Custom Dates</h4>
              <span>(mm-dd-yyyy)</span>
            </div>
            <div styleName="custom-dates">
              <input type="text" styleName={`${startDateStringError ? 'error' : ''}`} onChange={this.handleStartDateStringChange} value={startDateString} /> - <input type="text" styleName={`${endDateStringError ? 'error' : ''}`} onChange={this.handleEndDateStringChange} value={endDateString} />
            </div>
            <button type="button" styleName="apply" onClick={this.onApplyCustomDates}>Apply</button>
          </div>
        }
      </div>
    )
  }
}

export default DatePicker
