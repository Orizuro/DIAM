import './App.css';
import AuthProvider from './hooks/AuthProvider';
import LoginPage from './pages/Login';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <LoginPage />
        <header className="App-header">
          <ul className="nav nav-pills">
            <li className="active"><a data-toggle="pill" href="#home">Home</a></li>
            <li><a data-toggle="pill" href="#menu1">Menu 1</a></li>
            <li><a data-toggle="pill" href="#menu2">Menu 2</a></li>
            <li><a data-toggle="pill" href="#menu3">Menu 3</a></li>
          </ul>
        </header>
      </AuthProvider>
    </div>
  );
}

export default App;
