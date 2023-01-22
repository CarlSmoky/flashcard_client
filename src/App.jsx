import GlobalStyles from "./global-style"
import Home from "./pages/Home"

const App = () => {

  return (
    <div className="App">
      <GlobalStyles/>
      <Home content='menu'/>
    </div>
  );
}

export default App;
