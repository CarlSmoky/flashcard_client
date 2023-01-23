import GlobalStyles from "./global-style"
import Home from "./pages/Home"
import DeckList from "./pages/DeckList";

const App = () => {

  return (
    <div className="App">
      <GlobalStyles/>
      <Home content='menu'/>
      <DeckList content='decks'/>
    </div>
  );
}

export default App;
