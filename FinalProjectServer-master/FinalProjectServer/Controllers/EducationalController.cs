using final_proj.BL;
using Microsoft.AspNetCore.Mvc;


namespace final_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationalController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                IEnumerable<EducationalInstitution> educationalInstitutions = EducationalInstitution.Read();
                return Ok(educationalInstitutions);
            }
            catch (Exception ex)
            {
                // Return a StatusCode of 500 (Internal Server Error) 
                return StatusCode(500, "An error occurred while fetching educational institutions: " + ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] EducationalInstitution ed)
        {
            try
            {
                int result = ed.Insert();
                return Ok(result); // Return HTTP 200 OK with the result
            }
            catch (System.Data.SqlClient.SqlException ex)
            {

              //  For example if a user enters an existing ID
                return BadRequest("An error occurred while inserting data: " + ex.Message);
            }
            catch (Exception ex)
            {
                
                // For simplicity, just return a BadRequest with the error message
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }



        [HttpPut()]
        public IActionResult Put([FromBody] EducationalInstitution ed)
        {
            try
            {
                int result = ed.UpdateEducation();
                //check the id of the update
                if (result == 0)
                {
                    return BadRequest("This identifier does not exist in the database");
                }

                return Ok(result); // Return HTTP 200 OK with the result
            }
            catch (Exception ex)
            {
                // For simplicity, just return a BadRequest with the error message
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public int Delete(string id)
        {
            EducationalInstitution u = new EducationalInstitution();
            return u.DeleteEducation(id);

        }
    }
}

