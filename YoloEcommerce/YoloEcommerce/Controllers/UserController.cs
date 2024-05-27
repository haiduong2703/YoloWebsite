using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using YoloEcommerce.DTO.User;
using YoloEcommerce.Interface.Product;
using YoloEcommerce.Interface.User;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _UserServices;

        public UserController(IUserServices UserServices)
        {
            _UserServices = UserServices;
        }
        [HttpGet]
        public IActionResult GetUserById(int id)
        {
            return Ok(_UserServices.getUserById(id));
        }
        [HttpGet]
        public IActionResult GetUserByName(string name)
        {
            return Ok(_UserServices.checkUserByName(name));
        }
        [HttpPost]
        public IActionResult CreateUser(UserDTO user)
        {
            return Ok(_UserServices.createUser(user));
        }
        [HttpPut]
        public IActionResult UpdateUser(UserUpdateDTO user)
        {
            return Ok(_UserServices.updateUser(user));
        }
        [HttpGet]
        public IActionResult ActiveUser(int id)
        {
            return Ok(_UserServices.activeUser(id));
        }
        [HttpPut]
        public IActionResult ChangeStatusUser(int id, int status)
        {
            return Ok(_UserServices.changeStatusUser(id,status));
        }
        [HttpPut]
        public IActionResult ChangePassword(ChangePassDTO dto)
        {
            return Ok(_UserServices.changePassword(dto));
        }
        [HttpPost]
        public IActionResult GetAllUser(UserFilter dto)
        {
            return Ok(_UserServices.getAllUser(dto));
        }
    }
}
