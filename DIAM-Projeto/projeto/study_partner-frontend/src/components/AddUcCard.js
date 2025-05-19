import "./styles/AddUcCard.css";
import "./styles/login.css"

const AddUcCard = ({onClick}) => {
    return (
        <div class="uc-card uc-card--add">
        <button 
            class="uc-add-button" 
            aria-label="Add new card"
            onClick={onClick}
        >
            +
        </button>
        </div>
    );
}

export default AddUcCard;