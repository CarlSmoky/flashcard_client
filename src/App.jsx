import GlobalStyles from "./global-style"
import Home from "./pages/Home"
import DeckList from "./pages/DeckList";
import Search from "./components/Search"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path ="/" element={<Home content='menu'/>}/>
        <Route path ="/decks" element={<DeckList content='decks'/>}/>
        <Route path ="/search" element={<Search />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
