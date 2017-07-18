import './styles.css'

import React from 'react'

import DatePicker from 'components/DatePicker'

function cb (startDate, endDate) {
  console.log('callback', arguments)
}

const startDateValue = new Date(2001, 10, 10)
const endDateValue = new Date(2010, 10, 10)

const Root = () => (
  <div styleName="container">
    <DatePicker callback={cb} startDateValue={startDateValue} endDateValue={endDateValue} />
  </div>
)

export default Root
