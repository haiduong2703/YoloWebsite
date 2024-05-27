using System.Collections.Generic;
namespace YoloEcommerce.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set;}
        public int IdCategory { get; set; }
        public ICollection<ProductSize> ProductSizes { get; set; }
        public ICollection<ProductColor> ProductColors { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual Category Category { get; set; }

    }
}
