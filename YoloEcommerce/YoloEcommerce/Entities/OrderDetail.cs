namespace YoloEcommerce.Entities
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int Quantiny { get; set; }
        public double Price {  get; set; }
        public double TotalPrice { get; set; }
        public int IdProduct { get; set; }
        public int IdOrder { get; set; }
        public int IdSize { get; set; }
        public int IdColor { get; set; }
        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }
        public virtual Color Color { get; set; }
        public virtual Size Size { get; set; }
    }
}
