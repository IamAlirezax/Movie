import React, { Component } from "react";
import "./../App.css";
import MovieRow from "./MovieRow.js";
import $ from "jquery";

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.performSearch("");
  }

  performSearch = searchTerm => {
    console.log("perform search using moviedb");
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=588cd28a15bbd47fa46b2a9c37de883b&query=" +
      searchTerm;
    const onMovieSelect = id => {
      this.props.onMovieSelect(id);
    };
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetched data successfully");
       const results = searchResults.results;
       
       console.log(searchResults);
        var movieRows = [];
        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;

          const movieRow = (
            <MovieRow
              onMovieSelect={id => onMovieSelect(id)}
              key={movie.id}
              movie={movie}
            />
          );
          movieRows.push(movieRow);
        });
        this.setState({ rows: movieRows });
      },
      error: (xhr, status, err) => {
        console.error("failed to fetch data");
      }
    });
  };
  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    this.setState({ searchTerm: event.target.value });
    boundObject.performSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div>
        <input
          style={{
            fontSize: 20,
            display: "center",
            paddingTop: 8,
            paddingBottom: 6,
            paddingLeft: 13
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Sök film"
        />
        {this.state.searchTerm.length > 0 ? (
          <div> {this.state.rows} </div>
        ) : null}
      </div>
    );
  }
}

export default MovieSearch;
