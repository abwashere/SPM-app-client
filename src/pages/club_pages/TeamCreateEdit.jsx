import React from "react";
import FormCreateEditTeam from "../../components/Forms/FormCreateEditTeam";
import teamApiHandler from "../../api/teamApiHandler";

import "../../styles/Forms.css";

const TeamCreateEdit = (props) => {
  function handleClick(event) {
    teamApiHandler
      .deleteTeam(props.match.params.id)
      .then(() => {
        console.log("team deleted");
        props.history.push(`/account`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="ContentMain Forms">
      {props.match.params.mode === "create" && (
        <h1>Ajouter une nouvelle équipe</h1>
      )}
      {props.match.params.mode === "edit" && (
        <h1>Mettre à jour les informations de l'équipe</h1>
      )}
      <FormCreateEditTeam />
      {props.match.params.mode === "edit" && (
        <button
          className="is-danger button is-outlined centered"
          onClick={handleClick}
        >
          Supprimer l'équipe
        </button>
      )}
    </div>
  );
};

export default TeamCreateEdit;
