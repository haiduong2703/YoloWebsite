namespace YoloEcommerce.DTO.User
{
    public class UserDTO
    {
        public int? Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public int IdRole { get; set; }
        public int? Status { get; set; }

    }
    public class UserUpdateDTO
    {
        public int? Id { get; set; }
       
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
   

    }
    public class ChangePassDTO
    {
        public int? Id { get; set; }
        public string? Passnew { get; set; }
    }
    public class UserFilter
    {
        public string Name { get; set; }
    }
       
}
