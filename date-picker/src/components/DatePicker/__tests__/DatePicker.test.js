import React from 'react'
import {shallow} from 'enzyme'
import DatePicker, {DateRange} from '../DatePicker'
describe('<DatePicker />', () => {
  it('should render', () => {
    const wrapper = shallow(<DatePicker />)
    // expect(wrapper.find('.container')).toHaveLength(1)
  })
})

describe('<DateRange />', () => {
  const startDate = new Date(2017, 1, 1)
  const endDate = new Date(2017, 1, 10)
  it('should render with no range unless start and end dates are provided', () => {
    const wrapper1 = shallow(<DateRange onActivate={jest.fn()}/>)
    const wrapper2 = shallow(<DateRange startDate={startDate} onActivate={jest.fn()}/>)
    const wrapper3 = shallow(<DateRange endDate={endDate} onActivate={jest.fn()}/>)
    expect(wrapper1.text()).toHaveLength(0)
    expect(wrapper2.text()).toHaveLength(0)
    expect(wrapper3.text()).toHaveLength(0)
  })
  it('should render with a range if start and end dates provided', () => {
    const wrapper = shallow(<DateRange startDate={startDate} endDate={endDate} onActivate={jest.fn()} />)
    expect(wrapper.text()).toBe('Feb 1, 2017 - Feb 10, 2017')
  })
})
