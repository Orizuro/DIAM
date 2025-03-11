import React, { useState } from "react";
import  "./styles.css"

const VolunteerForm = () => {
    const [comment, setComment] = useState("");
    const [commentValid, setCommentValid] = useState("");

    const isCommentValid = () => {
        if (comment.length < 10) {
            setCommentValid("O comentário deve ter pelo menos 10 caracteres.");
        } else {
            setCommentValid("Comentário válido!");
        }
    };

    const canSubmit = () => {
        if (comment.length >= 10) {
            alert("Formulário enviado com sucesso!");
        } else {
            alert("Por favor, valide o comentário antes de submeter.");
        }
    };

    return (
        <div className="volunteerForm">


            <form>
                <label htmlFor="name">Nome Completo:</label><br/>
                <input type="text" id="name" name="name"/><br/><br/>

                <label htmlFor="contacto">Contacto:</label><br/>
                <input type="text" id="contacto" name="contacto"/><br/><br/>

                <div className="grid">
                    <div className="grid-section">
                        <p>Datas:</p>
                        <label>
                            <input type="checkbox" id="check-1" name="check-1"/>
                            21/08/2025
                        </label>
                        <label>
                            <input type="checkbox" id="check-2" name="check-2"/>
                            22/08/2025
                        </label>
                        <label>
                            <input type="checkbox" id="check-3" name="check-3"/>
                            23/08/2025
                        </label>
                    </div>

                    <div className="grid-section">
                        <p>Horário:</p>
                        <label>
                            <input type="checkbox" id="check-4" name="check-4"/>
                            Manhã
                        </label>
                        <label>
                            <input type="checkbox" id="check-5" name="check-5"/>
                            Tarde
                        </label>
                        <label>
                            <input type="checkbox" id="check-6" name="check-6"/>
                            Noite
                        </label>
                    </div>
                </div>

                <br/>

                <div>
                    <label htmlFor="comment">Comentário:</label><br/>
                    <textarea
                        name="comentario"
                        id="comment"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <p style={{color: "darkgreen", fontWeight: "bold"}}>{commentValid}</p>
                </div>

                <button type="button" onClick={isCommentValid}>
                    Validar Comentário
                </button>
                <button type="button" onClick={canSubmit}>
                    Submeter
                </button>
            </form>
        </div>
    );
};

export default VolunteerForm;
