import React from 'react';
import './App.css';
import PeopleList from './pages/people/list/list';
import PeopleEdit from './pages/people/edit/edit';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/people/:id">
          <PeopleEdit/>
        </Route>
        
        <Route path="/people">
          <PeopleList/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
