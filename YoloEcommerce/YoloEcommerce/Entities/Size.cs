using System.Collections.Generic;
namespace YoloEcommerce.Entities
{
    public class Size
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<ProductSize> ProductSizes { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
