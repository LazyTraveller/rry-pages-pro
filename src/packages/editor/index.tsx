import React from 'react'
import ReactDom from 'react-dom'
// 这里App仅接着就会降到 它就是就是一个React FunctionComponent
import App from '@containers/home/app'

ReactDom.render(<App />, document.getElementById('root'))
