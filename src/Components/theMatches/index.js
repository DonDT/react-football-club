import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { firebaseMatches } from "../../firebase";
import { firebaseLooper, reverseArray } from "../ui/minsc";
import LeagueTable from "./table";
import MatchesList from "./matchesList";

class TheMatches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playerFilter: "All",
    resultFilter: "All"
  };

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);
      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      });
    });
  }

  render() {
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters" />
            <MatchesList match={this.state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;
