import React from "react";
import FormCreateEditEvent from "../../components/Forms/FormCreateEditEvent";

function EventCreateEdit(props) {
  console.log(props);
  return (
    <div className="ContentMain">
      {props.match.params.mode === "create" && (
        <h1>Créer un nouvel évènement</h1>
      )}
      {props.match.params.mode === "edit" && (
        <h1>Mettre à jour les informations de l'évènement</h1>
      )}
      <FormCreateEditEvent />
    </div>
  );
}

export default EventCreateEdit;
