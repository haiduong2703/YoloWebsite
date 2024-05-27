using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Net.Http;
using YoloEcommerce.DTO.VnPay;

namespace YoloEcommerce.Interface.VnPay
{
    public interface IVnPayServices
    {
        string CreatePaymentUrl(HttpContext context, VnPaymentRequestModel model);
        VnPaymentResponeModel PaymentExcute(IQueryCollection collection);

    }
}
