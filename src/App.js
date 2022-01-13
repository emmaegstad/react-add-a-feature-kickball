import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import AddTeam from './views/Teams/AddTeam';
import Team from './views/Teams/Team';
import EditTeam from './views/Teams/EditTeam';
import NotFound from './views/NotFound/NotFound';
import { useState, useEffect } from 'react';
import { getUser } from './services/users';
import Teams from './views/Teams/Teams';
import Header from './components/Header/Header';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = getUser();

    if (session?.user) setCurrentUser(session.user);
  }, []);

  return (
    <BrowserRouter>
      <Header user={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path="/">
          <Home user={currentUser} />
        </Route>
        <Route exact path="/sign-in">
          <Auth setCurrentUser={setCurrentUser} />
        </Route>
        <Route
          exact
          path="/teams"
          user={currentUser}
          render={(routeProps) => <Teams {...routeProps} user={currentUser} />}
        />
        <ProtectedRoute currentUser={currentUser} exact path="/teams/new">
          <Route
            exact
            path="/teams/new"
            render={(routeProps) => <AddTeam {...routeProps} user={currentUser} />}
          />
        </ProtectedRoute>
        <Route
          exact
          path="/teams/:id"
          currentUser={currentUser}
          render={(routeProps) => <Team {...routeProps} user={currentUser} />}
        />
        <ProtectedRoute currentUser={currentUser} exact path="/teams/:id/edit">
          <Route exact path="/teams/:id/edit">
            <EditTeam user={currentUser} />
          </Route>
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
