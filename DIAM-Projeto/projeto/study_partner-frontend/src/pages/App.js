import './App.css';
import './styles.css'
import Header from "../components/Header";
import QA from "./QA";
import Footer from "../components/Footer";
import Contacts from "./Contacts";
import HomePage from "./HomePage";

function ArtistsPage() {
  return null;
}

function App() {

  return (
      <div className="App">
        <Header />
        <HomePage/>
        <Contacts />
        <Footer />
      </div>
  );
}

export default App;
