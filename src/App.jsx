import GlobalStyles from "./global-style"
import Home from "./pages/Home"
import DeckList from "./pages/DeckList";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path ="/" element={<Home content='menu'/>}/>
        <Route path ="/decks" element={<DeckList content='decks'/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
