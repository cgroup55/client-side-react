using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_proj.BL
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("Login")]
        public List< Object> GetUserNameandPassword([FromBody] User user)
        {
            List<Object> u = new List<Object>(); 
            u = user.Login();
            return u;
        }
    }
}
