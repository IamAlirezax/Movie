import React from "react";
import { timingSafeEqual } from "crypto";

class MovieRow extends React.Component {
  viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
    window.location.href = url;
  }
  tmdbIDBooking() {
    const tmdbID = this.props.movie.id;
    this.props.onMovieSelect(tmdbID);
  }
  render() {
    return (
      <div>
        <table key={this.props.movie.id}>
          <tbody>
            <tr>
              <td>
                <img
                  alt="poster"
                  width="80"
                  src={this.props.movie.poster_src}
                />
              </td>
              <td>
                <h3>{this.props.movie.title}</h3>

                <p>{this.props.movie.overview}</p>
                <input
                  type="button"
                  onClick={this.viewMovie.bind(this)}
                  value=" Se Trailer"
                />
               
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MovieRow;
