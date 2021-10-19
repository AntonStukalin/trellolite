import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {MainPage} from './pages/MainPage'
import {BoardPage} from './pages/BoardPage'
import './scss/app.scss';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/BoardPage/:id' component={BoardPage}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
