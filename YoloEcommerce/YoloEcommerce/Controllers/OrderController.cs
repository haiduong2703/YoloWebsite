using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using YoloEcommerce.DTO.Order;
using YoloEcommerce.Interface.Color;
using YoloEcommerce.Interface.Order;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderServices _service;

        public OrderController(IOrderServices service)
        {
            _service = service;
        }
        [HttpPost]
        public IActionResult CreateOrder(OrderDTO dto)
        {
            return Ok(_service.CreateOrder(dto));
        }
        [HttpPost]
        public IActionResult GetAllOrder(OrderParamsDTO dto)
        {
            return Ok(_service.GetAllOrder(dto));
        }
        [HttpPut]
        public IActionResult ConfirmOrder(int id)
        {
            return Ok(_service.ConfirmOrder(id));
        }
        [HttpPut]
        public IActionResult CancelOrder(int id, string lyDo)
        {
            return Ok(_service.CancelOrder(id, lyDo));
        }
        [HttpPut]
        public IActionResult DeliveredOrder(int id)
        {
            return Ok(_service.DeliveredOrder(id));
        }
        [HttpPut]
        public IActionResult SuccessOrder(int id)
        {
            return Ok(_service.SuccessOrder(id));
        }
    }
}
