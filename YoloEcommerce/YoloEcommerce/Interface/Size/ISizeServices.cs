using System.Collections.Generic;
using YoloEcommerce.DTO.Size;

namespace YoloEcommerce.Interface.Size
{
    public interface ISizeServices
    {
        List<SizeDTO> getAllSize();
        string createSize(SizeDTO size);
        
    }
}
