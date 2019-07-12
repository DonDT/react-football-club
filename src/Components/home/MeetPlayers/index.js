import React, { Component } from "react";
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../ui/minsc";

class MeetPlayers extends Component {
  state = {};

  render() {
    return (
      <div
        className="home_meetplayers"
        style={{
          background: `#ffffff url(${Stripes})`
        }}
      >
        <div className="container">
          <div className="home_meetplayers_wrapper">
            <div className="home_card_wrapper">Card</div>
            <div className="home_text_wrapper">text</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MeetPlayers;
