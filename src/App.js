import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Search from './pages/Search';


import './App.css';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acf0',
      contrastText: '#fff',
    },
  },
});
const App = ({ store }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Search} />
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>

)
App.propTypes = {
  store: PropTypes.object.isRequired
}
export default App
