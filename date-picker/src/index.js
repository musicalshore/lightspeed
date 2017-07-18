import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from 'containers/Root'

const render = Component => {
  const root = document.getElementById('root')
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    root
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./containers/Root', () => { render(Root) })
}
