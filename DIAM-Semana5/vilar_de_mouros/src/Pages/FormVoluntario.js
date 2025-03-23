import React, { useState } from "react";
import { insultosPoucoConhecidos } from "./naughty";
import "./styles.css"
import Footer from "./Footer";

const availableDates = [
  "21/08/2025",
  "22/08/2025",
  "23/08/2025"
];

const availableTimes = [
  "Manhã",
  "Tarde",
  "Noite"
];

const FormVoluntario = () => {

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comment, setComment] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [hasNaughtyWord, setHasNaughtyWord] = useState(false);


  const handleComment = (comment) => {
    setComment(comment);

    const found = insultosPoucoConhecidos
      .some(insulto => comment.includes(insulto));

    setHasNaughtyWord(found);
  }

  const toggleDateCheckbox = (event, ind) => {
    const date = availableDates[ind];

    // Add element to list
    if (event.target.checked) {
      setSelectedDates([...selectedDates, date]);
    }

    // Remove element from list
    else {
      setSelectedDates(selectedDates.filter(element => element !== date))
    }
  }

  const toggleTimeCheckbox = (event, ind) => {
    const time = availableTimes[ind];

    if (event.target.checked) {
      setSelectedTimes([...selectedTimes, time]);
    } else {
      setSelectedTimes(selectedTimes.filter(element => element !== time));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Obrigado ${name} pela sua inscrição, em breve será contactado pela organização do festival`);
  }

  return (
    <div className="volunteerForm">
      <h2> Formulário de Candidatura a Voluntário </h2>
      <br/>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome Completo:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e)=> setName(e.target.value)}
          required
        />
        <br /><br />

        <label htmlFor="contacto">Contacto:</label><br />
        <input
          type="text"
          id="contacto"
          name="contacto"
          required
          onChange={(e)=> setPhoneNumber(e.target.value)}
        />
        <br /><br />

        <div className="grid">
          <div className="grid-section">
            <p>Datas:</p>
            {
              availableDates.map((date, i) =>
                <label key={i}>
                  <input type="checkbox" key={`check-${i}`} onChange={event => toggleDateCheckbox(event, i)} />
                  {date}
                </label>
              )
            }
          </div>

          <div className="grid-section">
            <p>Horário:</p>
            {
              availableTimes.map((time, i) =>
                <label key={i}>
                  <input
                    type="checkbox"
                    key={`check-${i + availableDates.length}`}
                    onChange={event => toggleTimeCheckbox(event, i)}
                  />
                  {time}
                </label>
              )
            }
          </div>
        </div>

        <br />

        <div>
          <label htmlFor="comment">Comentário:</label><br />
          <textarea
            name="comentario"
            id="comment"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e)=> handleComment(e.target.value)}
          ></textarea>
          {
            hasNaughtyWord &&
            <p style={{ color: "darkred", fontWeight: "bold" }}>Palavra proibida encontrada!</p>
          }
        </div>

        <button
          type="submit"
          disabled={hasNaughtyWord}>
          Submeter
        </button>
      </form>

    </div>

  );
};

export default FormVoluntario;
