namespace YoloEcommerce.Entities
{
    public class ProductImage
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public string? Title { get; set; }
        public int IdProduct { get; set; }
        public virtual Product Product { get; set; }
    }
}
