using System.Collections.Generic;

namespace YoloEcommerce.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public string? Description { get; set; }
        public ICollection< User> User { get; set; }

    }
}
