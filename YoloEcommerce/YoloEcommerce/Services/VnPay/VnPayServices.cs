using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Net.Http;
using YoloEcommerce.DTO.VnPay;
using YoloEcommerce.Helper;
using YoloEcommerce.Interface.VnPay;

namespace YoloEcommerce.Services.VnPay
{
    public class VnPayServices : IVnPayServices
    {
        private readonly IConfiguration _config;

        public VnPayServices(IConfiguration config) {
            _config = config;
        }
        public string CreatePaymentUrl(HttpContext context, VnPaymentRequestModel model)
        {
            var tick = DateTime.Now.Ticks.ToString();
            var vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", _config["VnPay:Version"]);
            vnpay.AddRequestData("vnp_Command", _config["VnPay:Command"]);
            vnpay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"]);
            vnpay.AddRequestData("vnp_Amount", (model.Amount * 100).ToString());

            vnpay.AddRequestData("vnp_CreateDate",model.CreateDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", _config["VnPay:CurrCode"]);
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            vnpay.AddRequestData("vnp_Locale", _config["VnPay:Locale"]);
            
            vnpay.AddRequestData("vnp_OrderInfo",""+model.OrderId);
            vnpay.AddRequestData("vnp_OrderType","other");
            vnpay.AddRequestData("vnp_ReturnUrl", _config["VnPay:PaymentBackUrl"]);

            vnpay.AddRequestData("vnp_TxnRef", tick);
            var paymnetUrl = vnpay.CreateRequestUrl(_config["VnPay:BaseUrl"], _config["VnPay:HashSecret"]);

            return paymnetUrl;

        }

        public VnPaymentResponeModel PaymentExcute(IQueryCollection collection)
        {
            var vnpay = new VnPayLibrary();
            foreach(var (key,value)in collection)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnpay.AddResponseData(key, value.ToString());
                }
            }
            var vnp_orderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
            var vnp_TransactionId = Convert.ToInt64(vnpay.GetResponseData("vnp"));
            var vnp_SecureHase = collection.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value;
            var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
            var vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");

            bool checkSignature = vnpay.ValidateSignature(vnp_SecureHase, _config["VnPay:HashSecret"]);
            if (!checkSignature)
            {
                return new VnPaymentResponeModel
                {
                    Success = false
                };
            }
            return new VnPaymentResponeModel
            {
                Success = true,
                PaymentMethod="VnPay",
                OrderDescription = vnp_OrderInfo,
                OrderId = vnp_orderId.ToString(),
                TransactionId = vnp_TransactionId.ToString(),
                Token = vnp_SecureHase,
                VnPayResponseCode = vnp_ResponseCode,
            };
        }
    }
}
