using System.Collections.Generic;

namespace YoloEcommerce.DTO.Product
{
    public class ProductDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int IdCategory { get; set; }
        public List<int>? IdSize { get; set; }
        public List<int>? IdColor { get; set; }
        public string[]? Base64String { get; set; }
        public string? NameCategory { get; set; }
        public List<string>? NameSize { get; set; }
        public List<string>? NameColor { get; set; }
        public List<string>? NamePath { get; set; }
    }
    public class ProductFilter
    {
        public string? Name { get; set; }
        public List<int>? Category { get; set;}
        public List<int>? Color { get; set;}
        public List<int>?Size { get; set; }
    }
    public class ProductGetDTO
    {
        public int? Id { get; set;}
    }
}
