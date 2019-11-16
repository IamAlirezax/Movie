import React, { Component } from "react";

export default class TestLista extends Component {
  constructor(props) {
    super(props);
  }

  handleBookingClick = id => {
    console.log("booking on movie" + id);
    this.props.handleBookingClick(id);
  };

  render() {
    return <div></div>;
  }
}
