import { useState } from 'react';
import './Header.css';
import Login from './login';
import {useAuth} from "../hooks/AuthProvider";


function Header() {
    const [showModal, setShowModal] = useState(false);
    const { currentUser, logout, isAuthenticated } = useAuth();

    return (
        <div className="Header">
            <div className="login-button-container">
                {isAuthenticated ? (
                    <>
                        <span className="user-name">Olá, {currentUser?.username}</span>
                        <button
                            className="logout-button"
                            onClick={() => {
                                logout();
                                setShowModal(false);
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="login-button" onClick={() => setShowModal(true)}>
                        Login
                    </button>
                )}
            </div>

            <nav className="navbar">
                <ul className="nav-links">
                    <li><a href="/" className="nav-link">Pagina Inicial</a></li>
                    <li><a href="/about" className="nav-link">Sobre</a></li>
                    <li><a href="/rules" className="nav-link">Regras de Comunidade</a></li>
                    <li><a href="/sessoes-de-estudo" className="nav-link">Sessões de Estudo</a></li>
                </ul>
            </nav>

            <img
                src={"/images/ISCTE_logo.jpg"}
                alt="ISCTE"
                className="header-logo"
            />

            {showModal && !isAuthenticated && (
                <Login onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}

export default Header;
