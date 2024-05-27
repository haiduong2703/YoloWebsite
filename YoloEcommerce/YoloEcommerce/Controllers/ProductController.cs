using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using YoloEcommerce.DTO.Product;
using YoloEcommerce.DTO.User;
using YoloEcommerce.DTO.VnPay;
using YoloEcommerce.Interface.Product;
using YoloEcommerce.Interface.VnPay;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductServices _ProductService;
        private readonly IVnPayServices _vnpayServices;

        public ProductController(IProductServices ProductService, IVnPayServices vnPayServices)
        {
            _ProductService = ProductService;
            _vnpayServices = vnPayServices;
        }
        [HttpPost]
        public IActionResult GetAll(ProductFilter? dto)
        {
            return Ok(_ProductService.GetProduct(dto));
        }
        [HttpPost]
        public IActionResult GetProductNew(ProductFilter? dto)
        {
            return Ok(_ProductService.GetProductNew(dto));
        }
        [HttpPost]
        public async Task<IActionResult> GetProductById(ProductGetDTO dto)
        {
            var result = await _ProductService.GetProductById(dto);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult CreateProduct([FromBody]ProductDTO dto)
        {
            return Ok(_ProductService.CreateProduct(dto));
        }
        [HttpPost]
        public IActionResult Payment([FromBody] VnPaymentRequestModel dto)
        {
            return Ok(_vnpayServices.CreatePaymentUrl(HttpContext,dto));
        }
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            return Ok(_ProductService.DeleteProduct(id));
        }
        [HttpPut]
        public IActionResult UpdateProduct([FromBody] ProductDTO dto)
        {
            return Ok(_ProductService.UpdateProduct(dto));
        }
        [HttpPost]
        public IActionResult PaymentController([FromBody] VnPaymentRequestModel dto)
        {
            var response = _vnpayServices.PaymentExcute(Request.Query);
            if(response == null || response.VnPayResponseCode != "00")
            {
                return Ok("Thất bại");
            }
            return Ok("Thành công");
        }
    }
}
