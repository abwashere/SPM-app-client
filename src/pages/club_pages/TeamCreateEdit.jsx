import React from "react";
import FormCreateEditTeam from "./../../components/Forms/FormCreateEditTeam";

const TeamCreateEdit = (props) => {
  return (
    <div className="ContentMain">
      {props.match.params.mode === "create" && (
        <h1>Créer une nouvelle équipe</h1>
      )}
      {props.match.params.mode === "edit" && (
        <h1>Mettre à jour les informations de l'équipe</h1>
      )}
      <FormCreateEditTeam />
    </div>
  );
};

export default TeamCreateEdit;
