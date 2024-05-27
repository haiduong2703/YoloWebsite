using System;

namespace YoloEcommerce.DTO.Contact
{
    public class ContactDTO
    {
        public int? Id { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? CustomerEmail { get; set; }
        public string? Request { get; set; }
        public int? Status { get; set; }
        public string? Reply {  get; set; }
        public DateTime? SendDate { get; set; }
    }
    public class ContactReply
    {
        public int? Id { get; set; }
        public string? Reply { get; set; }
        public string? Email { get; set; }
    }
}
