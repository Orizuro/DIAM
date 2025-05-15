import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contacts = () => {
    return (
        <div className="Contacts">
            <Header />
            <div className="MainBox">
                <h1>Contactos</h1>

                <h2>Informações de Contacto</h2>
                <p>
                    <strong>Telefone:</strong> +351 217 903 005<br />
                    <strong>Email:</strong> suport@studypartner.com
                    <strong>Morada:</strong> Avenida das Forças Armadas 1699-026 Lisboa
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Contacts;