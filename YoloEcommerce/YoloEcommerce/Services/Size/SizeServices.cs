using System;
using System.Collections.Generic;
using System.Linq;
using YoloEcommerce.DTO.Size;
using YoloEcommerce.Entities;
using YoloEcommerce.Interface.Size;

namespace YoloEcommerce.Services.Size
{
    public class SizeServices : ISizeServices
    {
        public readonly MyDbContext _context;
        public SizeServices(MyDbContext context)
        {
            _context = context;
        }
        public List<SizeDTO> getAllSize()
        {
            return _context.Sizes.Select(x => new SizeDTO
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
            }).ToList();
        }
        public string createSize(SizeDTO size)
        {
            try
            {
                var sizeNew = new Entities.Size();
                sizeNew.Name = size.Name;
                sizeNew.Description = size.Description;
                _context.Sizes.Add(sizeNew);
                _context.SaveChanges();
                return "Thêm thành công size";
            }catch(Exception ex)
            {
                return ex.Message;
            }
            
        }
    }
}
