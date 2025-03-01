import logo from './logo.svg';
import header from './Header.js';
import main from './Main.js';
import footer from './Footer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://fista.iscte-iul.pt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main/>
      <footer/>
    </div>
  );
}

export default App;
