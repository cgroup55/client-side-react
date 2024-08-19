using final_proj.BL;
using Microsoft.AspNetCore.Mvc;


namespace final_proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Student_disabilities_typeController : ControllerBase
    {
        // GET: api/<Student_disabilities_typeController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                IEnumerable<Student_disabilities_type> disabilitiesTypes = Student_disabilities_type.Read();
                return Ok(disabilitiesTypes);
            }
            catch (Exception ex)
            {
                // Return a StatusCode of 500 (Internal Server Error) 
                return StatusCode(500, "An error occurred while fetching student disabilities types: " + ex.Message);
            }
        }


    }
}
