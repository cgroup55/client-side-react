using final_proj.BL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace final_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportationCompanyController : ControllerBase
    {
        // GET: api/TransportationCompany
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                IEnumerable<TransportationCompany> companies = TransportationCompany.Read();
                return Ok(companies);
            }
            catch (Exception ex)
            {
                // Return a StatusCode of 500 (Internal Server Error) 
                return StatusCode(500, "An error occurred while fetching transportation companies: " + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] TransportationCompany company)
        {
            try
            {
                int result = company.Insert();
                if (result == 0)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Return a StatusCode of 500 (Internal Server Error) 
                return StatusCode(500, "An error occurred while inserting a transportation company: " + ex.Message);
            }
        }

            [HttpPut()]
        public IActionResult Put([FromBody] TransportationCompany company)
        {
            try
            {
                int result = company.Update();
                if (result == 0) 
                {

                    return BadRequest("This identifier does not exist in the database");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Return a StatusCode of 500 (Internal Server Error)
                return StatusCode(500, "An error occurred while updating a transportation company: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public int Delete(string id)
        {
            TransportationCompany u = new TransportationCompany();
            return u.Delete(id);

        }
    }
}