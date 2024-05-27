using System.Collections.Generic;
using System;
using YoloEcommerce.DTO.Size;
using YoloEcommerce.Entities;
using YoloEcommerce.DTO.Color;
using System.Linq;
using YoloEcommerce.Interface.Color;

namespace YoloEcommerce.Services.Color
{
    public class ColorServices : IColorServices
    {
        public readonly MyDbContext _context;
        public ColorServices(MyDbContext context)
        {
            _context = context;
        }
        public List<ColorDTO> getAllColor()
        {
            return _context.Colors.Select(x => new ColorDTO
            {
                Id = x.Id,
                Name = x.Name,
              
            }).ToList();
        }
        public string createColor(SizeDTO color)
        {
            try
            {
                var colorNew = new Entities.Color();
                colorNew.Name = color.Name;
               
                _context.Colors.Add(colorNew);
                _context.SaveChanges();
                return "Thêm thành công màu sắc";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        public List<ColorDTO> getColorById (int id)
        {
            var query = from d in _context.ProductColors
                        join c in _context.Colors on d.IdColor equals c.Id
                        where (d.IdProduct == id)
                        select new ColorDTO
                        {
                            Id = d.Id,
                            Name = c.Name
                        };
            return query.ToList();
            
        }
    }
}
