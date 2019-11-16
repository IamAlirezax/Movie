using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FilmBio1.Models
{
    public class MovieListViewModel
    {
        public List<MoviesViewModel> ListOfMovies { get; set; }
        public string ErrorMessage { get; set; }
    }
}