namespace YoloEcommerce.Entities
{
    public class ProductColor
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public int IdColor {  get; set; }
        public virtual Product Product { get; set; }
        public virtual Color Color { get; set; }
    }
}
