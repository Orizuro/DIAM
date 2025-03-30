import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const SurveyResults = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const surveyData = location.state;

  return (
    <>
      <button onClick={() => navigate("/")}>
        <strong>Página inicial</strong>
      </button>
      <div className="volunteerForm">
        <h2>Inquérito ao público do Festival de Vilar de Mouros</h2>
        <hr />
        <div>
          <h3>Artistas Preferidos:</h3>
          <div className="artitsList">
            <ul>
              {
                surveyData.artist ?
                  surveyData.artists.map((artist, index) => (
                    <li key={index}>- {artist}</li>
                  ))
                  :
                  "Não selecionou um artista preferido :("
              }
            </ul>
          </div>
        </div>
        <div>
          <h3>Horário Preferido:</h3>
          <p>{surveyData.selectedTime}</p>
        </div>
        <div>
          <h3>Críticas:</h3>
          <p>{surveyData.criticism}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SurveyResults;
