using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YoloEcommerce.Interface.Color;
using YoloEcommerce.Interface.Product;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IColorServices _service;

        public ColorController(IColorServices service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAllColor()
        {
            return Ok(_service.getAllColor());
        }
        [HttpGet]
        public IActionResult GetColorById(int id)
        {
            return Ok(_service.getColorById(id));
        }
    }
}
