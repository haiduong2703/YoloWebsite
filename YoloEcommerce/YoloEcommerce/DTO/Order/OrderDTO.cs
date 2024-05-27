using System;
using System.Collections.Generic;
using YoloEcommerce.Interface.OrderDetail;

namespace YoloEcommerce.DTO.Order
{
    public class OrderDTO
    {
        public int? Id { get; set; }
        public string? Code { get; set; }
        public int? Quantiny { get; set; }
        public int? TotalPrice { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? Address { get; set; }
        public DateTime? CreatedBy { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public int? IdUser { get; set; }
        public int? Status { get; set; }
        /*1: VNPay
        2: COD*/
        public int? TypePay { get; set; }
        public List<ProductViewDTO>? ListProducts { get; set; }
        public List<OrderDetailDTO>? OrderDetails { get; set; }
        public string? RejectionReason { get; set; }
    }
    public class OrderParamsDTO
    {
        public List<int> status { get; set; }
        public int? id { get; set; }
        public int? idOrder { get; set; }
    }
    public class ProductViewDTO {
        public string? Name { get; set; }
        public double? Price { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public int? Quantiny { get; set; }
        public List<string>?NamePath { get; set; }
    }
}
