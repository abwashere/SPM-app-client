import React from "react";
import FormCreateEditTeam from "./../../components/Forms/FormCreateEditTeam";

import "./../../styles/Forms.css";

const TeamCreateEdit = (props) => {
  return (
    <div className="ContentMain Forms">
      {props.match.params.mode === "create" && (
        <h1>Ajouter une nouvelle équipe</h1>
      )}
      {props.match.params.mode === "edit" && (
        <h1>Mettre à jour les informations de l'équipe</h1>
      )}
      <FormCreateEditTeam />
      {props.match.params.mode === "edit" && <p>Supprimer l'équipe</p>}
    </div>
  );
};

export default TeamCreateEdit;
