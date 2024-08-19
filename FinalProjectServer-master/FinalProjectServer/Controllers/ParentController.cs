using final_proj.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentController : ControllerBase
    {
       
        [HttpGet]
        
            public IActionResult Get()
            {
                try
                {
                    IEnumerable<Parent> parents = Parent.Read();
                    return Ok(parents);
                }
                catch (System.Data.SqlClient.SqlException ex)
                {
                    // For example if a user enters an existing ID
                    return BadRequest("An error occurred while fetching data: " + ex.Message);
                }
                catch (Exception ex)
                {
                    // For simplicity, just return a BadRequest with the error message
                    return StatusCode(500, "An unexpected error occurred: " + ex.Message);
                }
            }
        
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        
        [HttpPost]
        public int Post([FromBody] Parent parent)
        {
            //no insertion here
            return 0;
        }

        
        [HttpPut()]
        public IActionResult Put([FromBody] Parent parent)
        {
            try
            {
                int result = parent.Update();
                if (result == 0)
                {
                    return BadRequest("This identifier does not exist in the database");
                }
                return Ok(result);
            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                // For example if a user enters an existing ID
                return BadRequest("An error occurred while updating data: " + ex.Message);
            }
            catch (Exception ex)
            {
                // For simplicity, just return a BadRequest with the error message
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }

        // DELETE api/<PartnerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
