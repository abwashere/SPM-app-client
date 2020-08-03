import React from "react";
import FormCreateEditEvent from "../../components/Forms/FormCreateEditEvent";

import "./../../styles/Forms.css";

function EventCreateEdit(props) {
  console.log(props);
  return (
    <div className="ContentMain Forms">
      {props.match.params.mode === "create" && (
        <h1>Créer un nouvel évènement</h1>
      )}
      {props.match.params.mode === "edit" && (
        <h1>Mettre à jour les informations de l'évènement</h1>
      )}
      <FormCreateEditEvent />
      {props.match.params.mode === "edit" && <p>Supprimer l'évènement</p>}
    </div>
  );
}

export default EventCreateEdit;
