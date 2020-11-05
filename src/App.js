import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link 
} from "react-router-dom";
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainPage from './components/MainPage';
import Registro from './components/Registro';
import Ingreso from './components/Ingreso';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    }
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* <Paper style={{ height: "100vh" }}> */}
        <Router>
          <Switch>
            {/* <Route path="/" component={MainPage} /> */}
            {/* <Route exact path="/registro" render={() => <Registro />} /> */}
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/ingreso" component={Ingreso} />
            {/* <Route exact path="/ingreso" render={() => <Ingreso />} /> */}
            <Route path="/" render={() => <MainPage handleDarkMode={handleDarkMode}/>} />
          </Switch>
        </Router>
        {/* </Paper>  */}
      </ThemeProvider>
    </>
  );
}

export default App;
