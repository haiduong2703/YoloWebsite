using System.Collections.Generic;
namespace YoloEcommerce.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public int IdRole { get; set; }
        /*1: mở khóa
        2: khóa*/
        public int Status { get; set; }
        public virtual Role Role { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
