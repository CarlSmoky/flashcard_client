import GlobalStyles from "./global-style"
import { Route, Routes } from 'react-router-dom';
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import Menu from "./pages/Menu";
import Create from "./pages/Create";
import DeckList from "./pages/DeckList";
import Practice from "./pages/Practice";
import Edit from "./pages/Edit";

const App = () => {

  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/decklist" element={<DeckList />} />
        <Route path="/deck/:id" element={<Practice />} />
        <Route path="/edit/:id" element={<AuthenticationGuard component={Edit} />} />
        <Route path="/create" element={<AuthenticationGuard component={Create} />} />
      </Routes>
    </div>
  );
}

export default App;
