import Nav from "./Nav"
import Home from "./Home"
import Footer from "./Footer"
import GlobalStyles from "./global-style"


const App = () => {
  return (
    <div className="App">
      <GlobalStyles/>
      <Nav/>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
