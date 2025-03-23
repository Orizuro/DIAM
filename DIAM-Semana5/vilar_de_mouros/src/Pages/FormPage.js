import './App.css';
import './styles.css';
import Main from './Main.js';
import Footer from './Footer.js';
import FormVoluntario from "./FormVoluntario";
import Header from "./Header";

function App() {
    return (
        <div className="FormPage">
            <Header />
            <FormVoluntario/>
            <Footer />
        </div>
    );
}

export default App;
