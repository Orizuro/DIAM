import React from 'react';
import Header from './Header';
import Footer from './Footer';

const QA = () => {
    const faqItems = [
        {
            question: "O site tem algum custo para os utilizadores?",
            answer: "Não, o site é completamente gratuito. Todos os recursos, materiais e funcionalidades estão disponíveis sem qualquer custo para os estudantes."
        },
        {
            question: "Posso partilhar materiais dos meus professores ou colegas?",
            answer: "Pode partilhar materiais apenasse tiveres permissão para o fazer e se respeitares os direitos de autor. É essencial indicar sempre as fontes e garantir que não estás a divulgar conteúdos não autorizados."
        },
        {
            question: "Quem pode participar numa comunidade?",
            answer: "A comunidade é destinada a estudantes do ISCTE, independentemente do curso. Qualquer aluno com vontade de aprender é bem-vindo."
        },
        {
            question: "Como posso denunciar um comportamento inadequado?",
            answer: "Comportamentos inadequados que violem o Código de Conduta devem ser reportados para o email suporte@studypartner.com. Pode optar por manter o seu anonimato."
        }
    ];

    return (
        <div className="QA">
            <Header />
            <div className="MainBox">
                <h1>Perguntas Frequentes</h1>

                {faqItems.map((item, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>{item.question}</h3>
                        <p>{item.answer}</p>
                    </div>
                ))}

                <h2>Não encontrou a resposta que procurava?</h2>
                <p>Contacte-nos através da nossa página de <a href="/contacts">contactos</a>.</p>
            </div>
            <Footer />
        </div>
    );
};

export default QA;