using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YoloEcommerce.Interface.Category;
using YoloEcommerce.Interface.Color;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryServices _service;

        public CategoryController(ICategoryServices service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAllCategory()
        {
            return Ok(_service.getAllCategory());
        }
    }
}
