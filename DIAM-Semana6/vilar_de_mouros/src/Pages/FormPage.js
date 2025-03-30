import './App.css';
import './styles.css';
import Footer from './Footer.js';
import FormVoluntario from "./FormVoluntario";
import Header from "./Header";

function FormPage() {
  return (
    <div className="FormPage">
      <Header />
      <FormVoluntario />
      <Footer />
    </div>
  );
}

export default FormPage;
