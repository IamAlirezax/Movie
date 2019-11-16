import React, { Component } from "react";
import Booking from "./Booking"
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

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { result: null, loaded: false , Email: "" };
  
 

  this.Email = this.Email.bind(this);
}


  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const response = await fetch("https://localhost:44312/api/Movies")
      .then(response => response.json())
      .then(data => this.setState({ result: data, loaded: true }));
      console.log(this.state.result)
  };
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
        tmdbID: this.state.result.Id,
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
        <div>Visnings</div>
        {this.state.loaded ? (
          this.state.result !== null ? (
           
            <div>    {this.state.result !== undefined && this.state.result !== null
                ? this.state.result.map(item => (
                    <div>
                   <a>iu{item.Id} * Datum = {item.ViewingDate} **Filmnamn = {item.MovieName} **längd =
                      {item.Length} **Antal sittplatser = {item.TotalSeats} 
                      <img
                  alt="poster"
                  width="80"
                  src={item.poster_path}
                /> </a>
                      <div>
        {" "}
        
          <div>Bokning för film: {item.MovieName}</div>

          <InputGroup className="mb-3">
            <Input type="text" onChange={this.Email} placeholder="Email" />
          </InputGroup>

          <Button
            onClick={() => this.booking(this.props.MovieName)}

            color="success"
            block
          >
            Boka
          </Button>
        </div>
      
                     
                    </div>
                  ))
                : null}
            </div>
          ) : null
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
