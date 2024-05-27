using System;

namespace YoloEcommerce.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public string Request { get; set; }
        /*1: chưa trả lời
        2: đã trả lời*/
        public int Status { get; set; }
        public string Reply { get; set; }
        public DateTime SendDate { get; set; }
    }
}
