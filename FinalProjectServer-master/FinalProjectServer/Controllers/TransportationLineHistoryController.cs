using final_proj.BL;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportationLineHistoryController : ControllerBase
    {
        // GET: api/<TransportationLineHistoryController>
        [HttpGet]
        public IActionResult Get(int linecode)
        {
            try
            {
                IEnumerable<TransportationLineHistory> companies = TransportationLineHistory.Read(linecode);
                return Ok(companies);
            }
            catch (Exception ex)
            {
                // Return a StatusCode of 500 (Internal Server Error) 
                return StatusCode(500, "An error occurred while fetching transportation companies: " + ex.Message);
            }
        }

       

        // POST api/<TransportationLineHistoryController>
        [HttpPost]
        public ActionResult<int> Post([FromBody] TransportationLineHistory tlh)
        {
            try
            {
                var result = tlh.Insert();
                return Ok(result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                // Handle the case where the foreign key constraint is violated
                return BadRequest("Foreign key constraint violation: transportation company or escort not found.");
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/<TransportationLineHistoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TransportationLineHistoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
