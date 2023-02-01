import GlobalStyles from "./global-style"
import Frame from "./components/Frame"
import Search from "./components/Search"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Card from "./components/Card";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path ="/" element={<Frame content='menu'/>}/>
        <Route path ="/decklist" element={<Frame content='decklist'/>}/>
        {/* <Route path ="/search" element={<Search />}/> */}
        <Route path ="/deck/:deckName" element={<Frame content='card'/>}/>
      </Routes>
      </BrowserRouter>
      {/* <DeckSettings/> */}
    </div>
  );
}

export default App;
