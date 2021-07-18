import { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import JoinChat from './components/JoinChat';
import Signup from './components/Signup';
import { intercept } from './utils/networkWrapper';
import { getHttp } from './utils/httpRequests';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    intercept();
  });

  useEffect(() => {
    getHttp('/api/user/data', 'accessToken')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (!err.message.slice(-3) === '401') {
          return console.log(err.message);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user ? <Profile user={user} /> : <HomePage setUser={setUser} />}
        </Route>
        <Route exact path="/signup">
          <Signup setUser={setUser} />
        </Route>
        {user && (
          <Route path="/join">
            <JoinChat userId={user.id} />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
