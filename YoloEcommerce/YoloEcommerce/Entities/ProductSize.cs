namespace YoloEcommerce.Entities
{
    public class ProductSize
    {
        public int Id { get; set;}
        public int IdProduct { get; set; }
        public int IdSize { get; set; }
        public virtual Product Product { get; set; }
        public virtual Size Size { get; set; }
    }
}
