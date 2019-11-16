
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FilmBio1.Models;
using FilmBio1.LoginRegistration;
using Microsoft.Ajax.Utilities;

namespace FilmBio1.Controllers
{
    [RoutePrefix("Api/login")]
    public class LoginController : ApiController
    {
        MemberEntities1 DB = new MemberEntities1();

        [Route("InsertMember")]
        [HttpPost]
        public object InsertMember(Register Reg)
        {
            try
            {

              FilmenRegistration MemberLogin = new FilmenRegistration();
                if (MemberLogin.Id == 0)
                {
                    MemberLogin.FirstName = Reg.FirstName;
                    MemberLogin.LastName = Reg.LastName;
                    MemberLogin.City = Reg.City;
                    MemberLogin.Email = Reg.Email;
                    MemberLogin.Password = Reg.Password;
                    MemberLogin.SocialSecurityNR = Reg.SocialSecurityNR;
                    DB.FilmenRegistrations.Add(MemberLogin);
                    DB.SaveChanges();
                    return new Response
                    { Status = "Success", Message = "SuccessFully Saved." };
                }
            }
            catch (Exception)
            {

                throw;
            }
            return new Response
            { Status = "Error", Message = "Invalid Data." };
        }
        [Route("Login")]
        [HttpPost]
        public Response Login(Login login)
        {
            var log = DB.FilmenRegistrations.Where(x => x.Email.Equals(login.Email) && x.Password.Equals(login.Password)).FirstOrDefault();

            if (log == null)
            {
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Response { Status = "Success", Message = "Logged in" };
        }
    }
}
