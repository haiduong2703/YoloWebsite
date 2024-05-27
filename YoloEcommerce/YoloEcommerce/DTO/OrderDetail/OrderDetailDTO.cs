using System.Collections.Generic;

namespace YoloEcommerce.Interface.OrderDetail
{
    public class OrderDetailDTO
    {
        public int? Quantiny { get; set; }
        public int? Price { get; set; }
        public int? TotalPrice { get; set; }
        public int? IdProduct { get; set; }
        public int? IdSize { get; set; }
        public int? IdColor { get; set; }
    }
}
