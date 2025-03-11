import logo from '../logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Main/>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
