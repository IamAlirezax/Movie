import React from "react";

import {
  Button,
  Card,
  CardFooter,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: ""
    };

    this.Email = this.Email.bind(this);
  }

  handleClick = () => {};

  Email = event => {
    this.setState({ Email: event.target.value });
  };
  Password = event => {
    this.setState({ Password: event.target.value });
  };
  MovieID = event => {
    this.setState({ MovieID: event.target.value });
  };
  booking() {
    fetch("https://localhost:44312/api/Bookings", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: this.state.Email,
        tmdbID: this.props.movieID
      })
    })
      .then(Response => Response.json())
      .then(Result => {
        if (Result.Status == "Success") alert("Bokning slutförd");
        else alert("Något gick fel");
      });
  }
  render() {
    return (
      <div>
        {" "}
        <div>
          <div>Bokning för filmID: {this.props.movieID}</div>

          <InputGroup className="mb-3">
            <Input type="text" onChange={this.Email} placeholder="Email" />
          </InputGroup>

          <Button
            onClick={() => this.booking(this.props.movieId)}
            color="success"
            block
          >
            Boka
          </Button>
        </div>
      </div>
    );
  }
}
