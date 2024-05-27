using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YoloEcommerce.Interface.Color;
using YoloEcommerce.Interface.Size;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private readonly ISizeServices _service;

        public SizeController(ISizeServices service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAllSize()
        {
            return Ok(_service.getAllSize());
        }
    }
}
