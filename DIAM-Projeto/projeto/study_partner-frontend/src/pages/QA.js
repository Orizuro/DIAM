import React, {useState} from 'react';
import './QA.css'

const QA = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const QAItems = [
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
        },
        {
            question: "Não encontrou a resposta que procurava?",
            answer: "contacts-link"
        }

    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    const renderAnswer = (answer, index) => {
        if (answer === "contacts-link") {
            return (
                <p>
                    Contacte-nos através da nossa página de{' '}
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/Contactos';
                    }}>
                        Contactos
                    </a>
                    .
                </p>
            );
        }
        return <p>{answer}</p>;
    };

    return (
        <div className="QA">
            <div className="MainBox">
                <h1>Perguntas Frequentes</h1>

                {QAItems.map((item, index) => (
                    <div key={index} style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => toggleAnswer(index)}>
                        <h2>{item.question}</h2>
                        {activeIndex === index && renderAnswer(item.answer, index)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QA;
