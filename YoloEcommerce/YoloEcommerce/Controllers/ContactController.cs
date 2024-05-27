using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YoloEcommerce.DTO.Contact;
using YoloEcommerce.Interface.Color;
using YoloEcommerce.Interface.Contact;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactServices _service;

        public ContactController(IContactServices service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAllContact()
        {
            return Ok(_service.getAllContact());
        }
        [HttpPost]
        public IActionResult CreateContact(ContactDTO dto)
        {
            return Ok(_service.createContact(dto));
        }
        [HttpGet]
        public IActionResult GetContactById(int id)
        {
            return Ok(_service.getContactById(id));
        }
        [HttpPut]
        public IActionResult Reply(ContactReply dto)
        {
            return Ok(_service.reply(dto));
        }
        [HttpDelete]
        public IActionResult DeletedContact(int id)
        {
            return Ok(_service.DeletedContact(id));
        }
    }
}
