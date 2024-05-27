using System;
using System.Collections.Generic;
namespace YoloEcommerce.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int Quantiny {  get; set; }
        public int TotalPrice { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime CreatedBy { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public int IdUser { get; set; }
        /*
         1: Đơn hàng mới
         2: Đơn hàng đã nhận
         3: Đơn hàng đã giao ĐVVC
         4: Đơn hàng giao thành công
         5: Đơn hàng Đã hủy
         */
        public int Status { get; set; }
        public string Address { get; set; }
        public int TypePay { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual User User { get; set; }
        public string? RejectionReason { get; set; }
    }
}
