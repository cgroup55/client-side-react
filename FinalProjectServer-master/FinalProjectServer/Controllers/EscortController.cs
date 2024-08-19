using final_proj.BL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace final_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EscortController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                IEnumerable<Escort> escorts = Escort.Read();
                return Ok(escorts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Escort escort)
        {
            try
            {
                int result = escort.Insert();
                return Ok(result);
            }
            catch (System.Data.SqlClient.SqlException ex)
            {
                // For example if a user enters an existing ID
                return BadRequest("An error occurred while inserting data: " + ex.Message);
            }
            catch (Exception ex)
            {
                // For simplicity, just return a BadRequest with the error message
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }

        [HttpPut()]
        public IActionResult Put([FromBody] Escort escort)
        {
            try
            {
                int result = escort.Update();
                if(result == 0)
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
                //  just return a BadRequest with the error message
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                Escort escort = new Escort();
                int result = escort.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
