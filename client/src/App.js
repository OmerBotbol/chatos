import { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import JoinChat from './components/JoinChat';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user ? <Profile user={user} /> : <HomePage />}
        </Route>
        <Route exact path="/signup">
          <Signup setUser={setUser} />
        </Route>
        {user && (
          <Route path="/join">
            <JoinChat userId={user.uid} />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
