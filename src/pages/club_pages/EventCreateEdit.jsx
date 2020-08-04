import React from "react";
import FormCreateEditEvent from "../../components/Forms/FormCreateEditEvent";
import eventApiHandler from "../../api/eventApiHandler";

function EventCreateEdit(props) {
  function handleClick(event) {
    eventApiHandler
      .deleteEvent(props.match.params.id)
      .then(() => {
        console.log("event deleted");
        props.history.push(`/account`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="ContentMain Forms">
      {props.match.params.mode === "create" && (
        <h1>Créer un nouvel évènement</h1>
      )}
      {props.match.params.mode === "edit" && (
        <h1>Mettre à jour les informations de l'évènement</h1>
      )}
      <FormCreateEditEvent />
      {props.match.params.mode === "edit" && (
        <button
          className="is-danger button is-outlined centered"
          onClick={handleClick}
        >
          Supprimer l'événement
        </button>
      )}
    </div>
  );
}

export default EventCreateEdit;
