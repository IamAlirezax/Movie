﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using FilmBio1.Models;
using FilmBio1.Libraries.MovieDB;

namespace FilmBio1.Controllers
{

    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "get,post")]
    public class MoviesController : ApiController
    {
        private MemberEntities1 db = new MemberEntities1 ();

        // GET: api/Movies
        public List<MoviesViewModel> Getmovies()
        {
            var listOfMovies = db.visnings.OrderBy(v => v.date); // Get movies and sort them in date order
            var resultList = new List<MoviesViewModel>(); // Define the return structure

            foreach (var movie in listOfMovies) // For each movie in the viewings table (plus lounge information)
            {
                try
                {
                    var movieFromMovieDB = MovieFetcher.GetMovie(movie.movieid); // Make a fetch to Movie DB to get information about a movie

                    // To the return list, add a View Model and add the information from both the Viewing, Lounge and MovieDB into a single object
                    resultList.Add(new MoviesViewModel
                    {
                        Id = movie.id,
                        MovieName = movieFromMovieDB.Title, // Title for the Movie from the MovieDB
                        Length = movieFromMovieDB.Runtime ?? 0, // The runtime from MovieDB
                        Adult = movieFromMovieDB.Adult, // If it's a adult movie, from MovieDB
                        LoungeName = movie.salong, // The lounge name from Lounge entity in the database (contected using Entity Framework)
                        ViewingDate = movie.date, // Date of the viewing from the Viewing entity in the database
                        TotalSeats = movie.maxseats, // And number of seats in the Lounge
                        Picture = movieFromMovieDB.PosterPath

                    });
                }
                catch
                {
                    return new List<MoviesViewModel>();
                }
            }

            return resultList; // Return the list of Movies

        }

        // GET: api/Movies/5
        [ResponseType(typeof(visning))]
        public IHttpActionResult Getmovies(int id)
        {
            visning movies = db.visnings.Find(id);
            if (movies == null)
            {
                return NotFound();
            }

            return Ok(movies);
        }

        // PUT: api/Movies/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putmovies(int id, visning movies)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movies.id)
            {
                return BadRequest();
            }

            db.Entry(movies).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!moviesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Movies
        [ResponseType(typeof(visning))]
        public IHttpActionResult Postmovies(visning movies)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.visnings.Add(movies);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = movies.id }, movies);
        }

        // DELETE: api/Movies/5
        [ResponseType(typeof(visning))]
        public IHttpActionResult Deletemovies(int id)
        {
            visning movies = db.visnings.Find(id);
            if (movies == null)
            {
                return NotFound();
            }

            db.visnings.Remove(movies);
            db.SaveChanges();

            return Ok(movies);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool moviesExists(int id)
        {
            return db.visnings.Count(e => e.id == id) > 0;
        }
    }

    internal class TheMovieEntities
    {
    }
}