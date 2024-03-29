import GlobalStyles from "./global-style"
import Frame from "./components/Frame"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path ="/" element={<Frame content='menu'/>}/>
        <Route path ="/decklist" element={<Frame content='decklist'/>}/>
        <Route path ="/deck/:id" element={<Frame content='practice'/>}/>
        <Route path ="/edit/:id" element={<Frame content='edit'/>}/>
        <Route path ="/create" element={<Frame content='create'/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
