using System.Collections.Generic;
using YoloEcommerce.DTO.Order;

namespace YoloEcommerce.Interface.Order
{
    public interface IOrderServices
    {
        string CreateOrder(OrderDTO dto);
        List<OrderDTO> GetAllOrder(OrderParamsDTO dto);
        bool ConfirmOrder(int id);
        bool CancelOrder(int id, string lyDo);
        bool DeliveredOrder(int id);
        bool SuccessOrder(int id);

    }
}
