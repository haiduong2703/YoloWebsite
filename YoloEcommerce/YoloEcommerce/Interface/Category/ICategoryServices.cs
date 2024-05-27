using System.Collections.Generic;
using YoloEcommerce.DTO.Category;

namespace YoloEcommerce.Interface.Category
{
    public interface ICategoryServices
    {
        List<CategoryDTO> getAllCategory();
    }
}
