import React, { Component } from "react";
import PlayerCard from "../ui/playerCard";
import Fade from "react-reveal/Fade";
import Stripes from "../../Resources/images/stripes.png";
import { firebasePlayers, firebase } from "../../firebase";
import { firebaseLooper } from "../ui/minsc";
import { Promise } from "core-js";

class TheTeam extends Component {
  state = {
    loading: true,
    player: []
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const player = firebaseLooper(snapshot);
      console.log("before render", player);
      let promises = [];
      for (let key in player) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("player")
              .child(player[key].image)
              .getDownloadURL()
              .then(url => {
                player[key].url = url;
                resolve();
              });
          })
        );
      }
      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          player
        });
      });
    });
  }

  showplayersByCategory = category =>
    this.state.player
      ? this.state.player.map((play, i) => {
          return play.position === category ? (
            <Fade delay={i * 20} left key={i}>
              <div className="item">
                <PlayerCard
                  number={play.number}
                  name={play.name}
                  lastname={play.lastname}
                  bck={play.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    console.log(this.state.player);
    return (
      <div
        className="the_team_container"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        {!this.state.loading ? (
          <>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showplayersByCategory("Keeper")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showplayersByCategory("Defence")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showplayersByCategory("Midfield")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Stricker</div>
              <div className="team_cards">
                {this.showplayersByCategory("Stricker")}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default TheTeam;
