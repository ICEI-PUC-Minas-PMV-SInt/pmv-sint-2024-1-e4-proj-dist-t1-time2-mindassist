using Microsoft.AspNetCore.Mvc;

namespace mindassist.api.Controllers
{
    [ApiController]
    [Route("healthCheck")]
    public class HealthCheckController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHealth()
        {
            return Ok("Serviço de busca está operando normalmente.");
        }

        [HttpPost]
        public IActionResult PostHealth()
        {
            return Ok("Serviço de postagem está operando normalmente.");
        }
    }
}