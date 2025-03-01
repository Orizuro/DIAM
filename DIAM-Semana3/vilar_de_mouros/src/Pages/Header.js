// Objective: Create the header of the page

import logo from './logo.svg';

function Header(){
    return(
        <div className="Header" style>

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

        </div>
    );
}

export default Header;

