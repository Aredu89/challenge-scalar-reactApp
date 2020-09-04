import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

//Componentes
import NotFound from './componentes/common/NotFound'
import MoviesList from './componentes/movies/MoviesList'
import CreateMovie from './componentes/movies/CreateMovie'
import ViewMovie from './componentes/movies/ViewMovie'

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect
              to={{
                pathname: "/movies"
              }}
            />
          </Route>
          <Route path="/movies/edit/:id">
            <CreateMovie />
          </Route>
          <Route path="/movies/view/:id">
            <ViewMovie />
          </Route>
          <Route path="/movies/create">
            <CreateMovie />
          </Route>
          <Route path="/movies">
            <MoviesList />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
