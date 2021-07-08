import './App.css';
import Header from './components/header/header';
import Form from './components/form/form';
import HomePage from './components/home-page/home-page';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/home">
            <HomePage />
          </Route>

          <Route exact path="/form">
            <Form />
          </Route>

          <Route exact path="/form/:id">
            <Form />
          </Route>

          <Route exact path="">
            <Redirect exact from="/" to="/home" />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
