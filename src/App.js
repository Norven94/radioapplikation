import { useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChannelsProvider from "./contexts/ChannelsProvider"
import ProgramsProvider from "./contexts/ProgramsProvider";
import LoginProvider from "./contexts/LoginProvider";
import Channels from "./pages/Channels";
import Programs from "./pages/Programs";
import ChannelPage from "./pages/ChannelPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import GuardedRoute from "./components/GuardedRoute"
import ProfileProvider from "./contexts/ProfileProvider";


function App() {
  const [isAuth, setIsAuth] = useState(null);
  const state = { isAuth, setIsAuth };

  return (
    <div className="App">
      <LoginProvider value={state}>
        <ChannelsProvider>
          <ProgramsProvider>
            <ProfileProvider>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/login" component={LoginPage} />
                  <>
                    <Navbar />
                    <GuardedRoute exact path="/" component={Channels} auth={isAuth} />
                    <GuardedRoute exact path="/profile" component={ProfilePage} auth={isAuth} />
                    <GuardedRoute exact path="/program" component={Programs} auth={isAuth} />
                    <GuardedRoute exact path="/channels/:channelId" component={ChannelPage} auth={isAuth} />
                  </>
                </Switch>
              </BrowserRouter>
            </ProfileProvider>
          </ProgramsProvider>
        </ChannelsProvider>
      </LoginProvider>
    </div>
  );
}

export default App;
