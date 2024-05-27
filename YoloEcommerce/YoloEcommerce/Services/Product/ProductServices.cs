using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YoloEcommerce.DTO.Color;
using YoloEcommerce.DTO.Product;
using YoloEcommerce.Entities;
using YoloEcommerce.Interface.Product;

namespace YoloEcommerce.Services.Product
{
    public class ProductServices : IProductServices
    {
        private readonly MyDbContext _context;
        public ProductServices(MyDbContext context)
        {
            _context = context;
        }
        public List<ColorDTO> getColorById()
        {
            return _context.Colors.Select(x => new ColorDTO
            {
                Id = x.Id,
                Name = x.Name,

            }).ToList();
        }
        public List<ProductDTO> GetProduct(ProductFilter? dto)
        {
            var query = _context.Products.ToList();
            if(!string.IsNullOrEmpty(dto.Name))
            {
                query = query.Where(x=>x.Name.ToLower().Contains(dto.Name.ToLower())).ToList();
            }
            if (dto.Category !=null&&dto.Category.Count>0)
            {
                query = (from d in query 
                        join c in _context.Categorys on d.IdCategory equals c.Id
                        where dto.Category.Contains(c.Id)
                        select d).ToList();
            }
            if (dto.Size != null&&dto.Size.Count>0)
            {
                query = (from d in query
                         join p in _context.ProductSizes on d.Id equals p.IdProduct
                         join s in _context.Sizes on p.IdSize equals s.Id
                         where dto.Size.Contains(p.IdSize)
                         select d).ToList();
            }
            if (dto.Color != null&&dto.Color.Count > 0)
            {
                query = (from d in query
                         join p in _context.ProductColors on d.Id equals p.IdProduct
                         join s in _context.Colors on p.IdColor equals s.Id
                         where dto.Color.Contains(p.IdColor)
                         select d).ToList();
            }
            var result = from d in query
                         join g in _context.Categorys on d.IdCategory equals g.Id
                         select new ProductDTO
                         {
                             Id = d.Id,
                             Name = d.Name,
                             Description = d.Description,
                             Price = d.Price,
                             IdCategory = d.IdCategory,
                             NameCategory = g.Name,
                             NameColor = (from i in _context.ProductColors
                                          join c in _context.Colors on i.IdColor equals c.Id
                                          where i.IdProduct == d.Id
                                          orderby c.Id
                                          select c.Name 
                                          ).ToList(),
                             NameSize = (from i in _context.ProductSizes
                                         join s in _context.Sizes on i.IdSize equals s.Id
                                         where i.IdProduct == d.Id
                                         orderby s.Id
                                         select s.Name).ToList(),
                             NamePath = (from i in _context.ProductImages
                                         where i.IdProduct == d.Id
                                         select "https://localhost:44324/UploadedImages/" + i.Path).ToList()

                         };
           
           
            return result.ToList();
        }

        public List<ProductDTO> GetProductNew(ProductFilter? dto)
        {
            var query = _context.Products.ToList();
            if (!string.IsNullOrEmpty(dto.Name))
            {
                query = query.Where(x => x.Name.ToLower().Contains(dto.Name.ToLower())).ToList();
            }
            if (dto.Category != null && dto.Category.Count > 0)
            {
                query = (from d in query
                         join c in _context.Categorys on d.IdCategory equals c.Id
                         where dto.Category.Contains(c.Id)
                         select d).ToList();
            }
            if (dto.Size != null && dto.Size.Count > 0)
            {
                query = (from d in query
                         join p in _context.ProductSizes on d.Id equals p.IdProduct
                         join s in _context.Sizes on p.IdSize equals s.Id
                         where dto.Size.Contains(p.IdSize)
                         select d).ToList();
            }
            if (dto.Color != null && dto.Color.Count > 0)
            {
                query = (from d in query
                         join p in _context.ProductColors on d.Id equals p.IdProduct
                         join s in _context.Colors on p.IdColor equals s.Id
                         where dto.Color.Contains(p.IdColor)
                         select d).ToList();
            }
            var top6NewestProducts = query.OrderByDescending(x => x.Id).Take(8).ToList();

            var result = from d in top6NewestProducts
                         join g in _context.Categorys on d.IdCategory equals g.Id
                         select new ProductDTO
                         {
                             Id = d.Id,
                             Name = d.Name,
                             Description = d.Description,
                             Price = d.Price,
                             IdCategory = d.IdCategory,
                             NameCategory = g.Name,
                             NameColor = (from i in _context.ProductColors
                                          join c in _context.Colors on i.IdColor equals c.Id
                                          where i.IdProduct == d.Id
                                          orderby c.Id
                                          select c.Name
                                          ).ToList(),
                             NameSize = (from i in _context.ProductSizes
                                         join s in _context.Sizes on i.IdSize equals s.Id
                                         where i.IdProduct == d.Id
                                         orderby s.Id
                                         select s.Name).ToList(),
                             NamePath = (from i in _context.ProductImages
                                         where i.IdProduct == d.Id
                                         select "https://localhost:44324/UploadedImages/" + i.Path).ToList()
                         };


            return result.ToList();
        }
        public async Task<ProductDTO> GetProductById(ProductGetDTO dto)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductColors)
                .ThenInclude(pc => pc.Color)
                .Include(p => p.ProductSizes)
                .ThenInclude(ps => ps.Size)
                .Include(p => p.ProductImages)
                .Where(p => p.Id == dto.Id)
                .SingleOrDefaultAsync();

            if (product == null)
            {
                return null;
            }

            var productDTO = new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                IdCategory = product.IdCategory,
                NameCategory = product.Category.Name,
                IdColor = product.ProductColors.Select(pc => pc.Color.Id).ToList(),
                IdSize = product.ProductSizes.Select(ps => ps.Size.Id).ToList(),
                NameColor = product.ProductColors.Select(pc => pc.Color.Name).ToList(),
                NameSize = product.ProductSizes.Select(ps => ps.Size.Name).ToList(),
                NamePath = product.ProductImages.Select(pi => "https://localhost:44324/UploadedImages/" + pi.Path).ToList()
            };

            return productDTO;
        }

        public string DeleteProduct (int id)
        {
            var query = _context.Products.SingleOrDefault(x=>x.Id == id);
            if(query == null)
            {
                return "Không tìm thấy sản phẩm này";
            }
            else
            {
                _context.Products.Remove(query);
                _context.SaveChanges();
                return "Xóa thành công sản phẩm";
            }
        }
        public int CreateProduct (ProductDTO dto)
        {
            var productNew = new Entities.Product();
           

            productNew.Name = dto.Name;
            productNew.Description = dto.Description;
            productNew.Price = dto.Price;
            productNew.IdCategory = dto.IdCategory;
            _context.Products.Add(productNew);
            _context.SaveChanges();
            if (dto.IdSize.Count>0)
            {
                foreach (int item in dto.IdSize)
                {
                    var sizeNew = new Entities.ProductSize();
                    sizeNew.IdProduct = productNew.Id;
                    sizeNew.IdSize = item;
                    _context.ProductSizes.Add(sizeNew);
                }
            }

            if (dto.IdColor.Count > 0)
            {
                foreach (int item in dto.IdColor)
                {
                    var colorNew = new Entities.ProductColor();
                    colorNew.IdProduct = productNew.Id;
                    colorNew.IdColor = item;
                    _context.ProductColors.Add(colorNew);
                }
            }
            if(dto.Base64String.Length > 0)
            {
                List<string> filePaths = new List<string>();
                List<string> fileName = new List<string>();
                foreach (var imageData in dto.Base64String)
                {
                    // Giả định imageData.Base64String chứa dữ liệu ảnh dưới dạng base64
                    var bytes = Convert.FromBase64String(imageData);

                    // Tạo một đường dẫn file để lưu ảnh
                    var filePath = Path.Combine("wwwroot\\UploadedImages",Guid.NewGuid().ToString() + ".jpg");
                    var fileNameConver = Path.GetFileName(filePath);
                    // Ghi dữ liệu byte vào file
                    System.IO.File.WriteAllBytes(filePath, bytes);
                    filePaths.Add(filePath);
                    fileName.Add(fileNameConver);
                }
                foreach (string item in fileName)
                {
                    var pathNew = new Entities.ProductImage();
                    pathNew.IdProduct = productNew.Id;
                    pathNew.Path = item;
                    _context.ProductImages.Add(pathNew);
                }
            }
            _context.SaveChanges();
            return productNew.Id;
        }
        public int UpdateProduct(ProductDTO dto)
        {
            var productNew = _context.Products.SingleOrDefault(x => x.Id == dto.Id);


            productNew.Name = dto.Name;
            productNew.Description = dto.Description;
            productNew.Price = dto.Price;
            productNew.IdCategory = dto.IdCategory;

            var listIdSize = _context.ProductSizes.Where(x => x.IdProduct == dto.Id);
            foreach(var item in listIdSize)
            {
                _context.ProductSizes.Remove(item);
            }
            if (dto.IdSize.Count > 0)
            {
                foreach (int item in dto.IdSize)
                {
                    var sizeNew = new Entities.ProductSize();
                    sizeNew.IdProduct = productNew.Id;
                    sizeNew.IdSize = item;
                    _context.ProductSizes.Add(sizeNew);
                }
            }
            var listIdColor = _context.ProductColors.Where(x => x.IdProduct == dto.Id);
            foreach (var item in listIdColor)
            {
                _context.ProductColors.Remove(item);
            }
            if (dto.IdColor.Count > 0)
            {
                foreach (int item in dto.IdColor)
                {
                    var colorNew = new Entities.ProductColor();
                    colorNew.IdProduct = productNew.Id;
                    colorNew.IdColor = item;
                    _context.ProductColors.Add(colorNew);
                }
            }
           
            if (dto.Base64String.Length > 0)
            {
                var listPath = _context.ProductImages.Where(x => x.IdProduct == dto.Id);
                foreach (var item in listPath)
                {
                    _context.ProductImages.Remove(item);
                }
                List<string> filePaths = new List<string>();
                List<string> fileName = new List<string>();
                foreach (var imageData in dto.Base64String)
                {
                    // Giả định imageData.Base64String chứa dữ liệu ảnh dưới dạng base64
                    var bytes = Convert.FromBase64String(imageData);

                    // Tạo một đường dẫn file để lưu ảnh
                    var filePath = Path.Combine("wwwroot\\UploadedImages", Guid.NewGuid().ToString() + ".jpg");
                    var fileNameConver = Path.GetFileName(filePath);
                    // Ghi dữ liệu byte vào file
                    System.IO.File.WriteAllBytes(filePath, bytes);
                    filePaths.Add(filePath);
                    fileName.Add(fileNameConver);
                }
                foreach (string item in fileName)
                {
                    var pathNew = new Entities.ProductImage();
                    pathNew.IdProduct = productNew.Id;
                    pathNew.Path = item;
                    _context.ProductImages.Add(pathNew);
                }
            }
            _context.SaveChanges();
            return productNew.Id;
        }
    }
}
