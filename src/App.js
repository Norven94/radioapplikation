import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChannelsProvider from "./contexts/ChannelsProvider"
import Channels from "./pages/Channels";
import Programs from "./pages/Programs";
import ChannelPage from "./pages/ChannelPage"

function App() {
  return (
    <div className="App">
      <ChannelsProvider>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Channels} />
          <Route exact path="/" component={Programs} />
          <Route exact path="/channels/:channelId" component={ChannelPage} />
        </BrowserRouter>
      </ChannelsProvider>
    </div>
  );
}

export default App;
