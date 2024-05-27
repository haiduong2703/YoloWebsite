using System.Collections.Generic;
using System.Threading.Tasks;
using YoloEcommerce.DTO.Product;
using YoloEcommerce.Entities;

namespace YoloEcommerce.Interface.Product
{
    public interface IProductServices
    {
        List<ProductDTO> GetProduct(ProductFilter? dto);
        string DeleteProduct(int id);
        int CreateProduct(ProductDTO dto);
        int UpdateProduct(ProductDTO dto);
         Task<ProductDTO> GetProductById(ProductGetDTO dto);
        List<ProductDTO> GetProductNew(ProductFilter? dto);
    }
}
