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
            return Ok("Servi�o de busca est� operando normalmente.");
        }

        [HttpPost]
        public IActionResult PostHealth()
        {
            return Ok("Servi�o de postagem est� operando normalmente.");
        }
    }
}