import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './styles/theme'
import Navigation from './components/Navigation'
import LoadErrorMessage from './components/LoadErrorMessage'
import './App.css'

class App extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { muiTheme }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Navigation />
          <div className="App">
            { this.props.children }
          </div>
          <LoadErrorMessage />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
