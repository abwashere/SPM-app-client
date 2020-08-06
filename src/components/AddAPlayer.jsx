import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import "bulma/css/bulma.css";
import playerApiHandler from "../api/playerApiHandler";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class AddAPlayer extends Component {
  state = {};

  //   handleChange = (event) => {
  //     const value = event.target.value;
  //     const key = event.target.name;
  //     this.props.handleTrainingChange(this.props.number, key, value);
  //   };

  //   handleClick = (event) => {
  //     this.props.removeTraining(this.props.number);
  //   };

  componentDidMount() {
    playerApiHandler
      .getPlayers()
      .then((apiRes) => this.setState({ players: apiRes }))
      .catch((err) => console.log(err));
  }

  render() {
    if (!this.state.players) return null;

    const playerArray = this.state.players.map((player) => {
      console.log(player);
      return {
        name: player.firstName + " " + player.lastName,
        id: player._id,
        picture: player.picture,
      };
    });

    console.log(playerArray);
    return (
      <div id="checkbox-player">
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={playerArray}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {
                <div className="flex">
                  <img
                    className="checkbox-image"
                    src={option.picture}
                    alt="pic"
                  />{" "}
                  <p>{option.name}</p>
                </div>
              }
            </React.Fragment>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Ajouter des membres"
              placeholder="Membres de l'équipe"
            />
          )}
        />
      </div>
    );
  }
}

export default AddAPlayer;
