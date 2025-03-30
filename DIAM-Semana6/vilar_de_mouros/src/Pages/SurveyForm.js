import { useState } from "react";
import { useNavigate } from "react-router-dom";
import artists from '../artists.json'

function SurveyForm() {

  const navigate = useNavigate();
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [criticism, setCriticism] = useState("");

  const toggleSelectedArtist = (artist) => {
    if (selectedArtists.includes(artist))
      setSelectedArtists(selectedArtists.filter(elem => elem !== artist));
    else
      setSelectedArtists([...selectedArtists, artist]);

    console.log(selectedArtists);
  }

  const availableArtists = artists.map(artist => artist.nome)

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/resultado", {
      state: {
        artists: selectedArtists,
        selectedTime: selectedTime,
        criticism: criticism
      }
    });
  };

  return (
    <div className="volunteerForm">
      <form onSubmit={handleSubmit}>
        <h2>Inquérito ao público do Festival</h2>

        <div>
          <h3>Quais foram os artistas de que gostou no festival?</h3>
          {
            availableArtists.map((artist, i) =>
              <label key={artist}>
                <input key={artist + i} type="checkbox" value={artist} onClick={() => toggleSelectedArtist(artist)} /> {artist}
              </label>
            )
          }
        </div>

        <div>
          <h3>Qual o seu horário preferido para os concertos?</h3>
          <label>
            <input
              type="radio"
              name="best_time"
              value="21h"
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />{" "}
            21h
          </label>
          <label>
            <input
              type="radio"
              name="best_time"
              value="22h"
              onChange={(e) => setSelectedTime(e.target.value)}
            />{" "}
            22h
          </label>
          <label>
            <input
              type="radio"
              name="best_time"
              value="23h"
              onChange={(e) => setSelectedTime(e.target.value)}
            />{" "}
            23h
          </label>
        </div>

        <div>
          <h3>Críticas (o que não correu bem no festival):</h3>
          <textarea onChange={(e) => setCriticism(e.target.value)} required />
        </div>

        <button type="submit">Submeter inquérito</button>
      </form>
    </div>
  );
};

export default SurveyForm;
