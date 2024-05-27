using System.Collections.Generic;
namespace YoloEcommerce.Entities
{
    public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ProductColor> ProductColors { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
