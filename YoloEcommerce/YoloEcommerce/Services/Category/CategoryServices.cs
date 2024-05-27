using System.Collections.Generic;
using System.Linq;
using YoloEcommerce.DTO.Category;
using YoloEcommerce.Entities;
using YoloEcommerce.Interface.Category;

namespace YoloEcommerce.Services.Category
{
    public class CategoryServices:ICategoryServices
    {
        public readonly MyDbContext _context;
        public CategoryServices(MyDbContext context)
        {
            _context = context;
        }
        public List<CategoryDTO> getAllCategory()
        {
            var query = _context.Categorys.Select(x=>new CategoryDTO
            {
                Id = x.Id,
                Name = x.Name,
            }).ToList();
            return query;
        }
    }
}
