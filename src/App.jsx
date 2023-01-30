import GlobalStyles from "./global-style"
import Frame from "./components/Frame"
import Search from "./components/Search"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path ="/" element={<Frame content='menu'/>}/>
        <Route path ="/decks" element={<Frame content='decklist'/>}/>
        <Route path ="/search" element={<Search />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
