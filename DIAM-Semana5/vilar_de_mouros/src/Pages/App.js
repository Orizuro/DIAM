import './App.css';
import './styles.css';
import Main from './Main.js';
import Footer from './Footer.js';
import Header from "./Header";
import {useNavigate} from "react-router-dom";

function App() {

  return (
      <div className="App">
          <Header/>
          <Main/>
          <Footer/>
      </div>
  );
}

export default App;
