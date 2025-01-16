import { useState } from "react";
import "../../css/inputSickness.css";

function InputSickness({ createSickness }) {
    const [sicknessName, setSicknessName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        createSickness(sicknessName);
    };

    const textChanged = event => {
        setSicknessName(event.target.value);
    };

    return (
        <div className="input-sickness-container">
            <form data-cy='submitSickness' className="sickness-form" onSubmit={handleSubmit}>
                <label className="sickness-label">Add new sickness</label>
                <div className="sickness-input-container relative">
                    <input
                        data-cy='sicknessName'
                        className="sickness-input"
                        placeholder="Add new sickness"
                        required
                        onChange={textChanged}
                        value={sicknessName}
                    />
                    <button type="submit" className="sickness-submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InputSickness;
