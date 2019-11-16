import React, { Component } from "react";
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

class Reg extends Component {
  constructor() {
    super();

    this.state = {
      FirstName: "",
      LastName: "",
      City: "",
      Email: "",
      Password: "",
      SocialSecurityNR: ""
    };

    this.Email = this.Email.bind(this);
    this.Password = this.Password.bind(this);
    this.Firstname = this.FirstName.bind(this);
    this.LastName = this.LastName.bind(this);
    this.Password = this.Password.bind(this);
    this.SocialSecurityNR = this.SocialSecurityNR.bind(this);
    this.City = this.City.bind(this);
    this.register = this.register.bind(this);
  }

  Email = event => {
    this.setState({ Email: event.target.value });
  };
  Password = event => {
    this.setState({ Password: event.target.value });
  };
  City = event => {
    this.setState({ City: event.target.value });
  };
  FirstName = event => {
    this.setState({ FirstName: event.target.value });
  };
  LastName = event => {
    this.setState({ LastName: event.target.value });
  };
  SocialSecurityNR = event => {
    this.setState({ SocialSecurityNR: event.target.value });
  };

  register(event) {
    fetch("https://localhost:44312/Api/login/InsertMember", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Password: this.state.Password,
        Email: this.state.Email,
        City: this.state.City,
        SocialSecurityNR: this.state.SocialSecurityNR
      })
    })
      .then(Response => Response.json())
      .then(Result => {
        if (Result.Status == "Success")
          this.props.history.push("./Dashboard.js");
        else alert("Något gick fel");
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div class="row" className="mb-2 pageheading">
                      <div class="col-sm-12 btn btn-primary">Sign Up</div>
                    </div>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.FirstName}
                        placeholder="Förnamn"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.LastName}
                        placeholder="Efternamn"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.Email}
                        placeholder="Email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="password"
                        onChange={this.Password}
                        placeholder="Lösenord"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        onChange={this.City}
                        placeholder="Stad"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        onChange={this.SocialSecurityNR}
                        placeholder="Personnummer"
                      />
                    </InputGroup>
                    <Button onClick={this.register} color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Reg;
