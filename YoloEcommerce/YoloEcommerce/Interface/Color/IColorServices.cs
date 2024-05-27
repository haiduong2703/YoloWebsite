using System.Collections.Generic;
using YoloEcommerce.DTO.Color;
using YoloEcommerce.DTO.Size;

namespace YoloEcommerce.Interface.Color
{
    public interface IColorServices
    {
        List<ColorDTO> getAllColor();
        string createColor(SizeDTO color);
        List<ColorDTO> getColorById(int id);
    }
}
