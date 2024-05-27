using Microsoft.EntityFrameworkCore;

namespace YoloEcommerce.Entities
{
    public class MyDbContext: DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Category> Categorys { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasMany(x => x.ProductColors).WithOne(x => x.Product).HasForeignKey(x => x.IdProduct);
                entity.HasMany(x => x.ProductSizes).WithOne(x => x.Product).HasForeignKey(x => x.IdProduct);
                entity.HasMany(x => x.ProductImages).WithOne(x => x.Product).HasForeignKey(x => x.IdProduct);
                entity.HasMany(x => x.OrderDetails).WithOne(x => x.Product).HasForeignKey(x => x.IdProduct);
            });
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasMany(x => x.Products).WithOne(x => x.Category).HasForeignKey(x => x.IdCategory);
            });
            modelBuilder.Entity<Size>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasMany(x => x.ProductSizes).WithOne(x => x.Size).HasForeignKey(x => x.IdSize);
                entity.HasMany(x => x.OrderDetails).WithOne(x => x.Size).HasForeignKey(x => x.IdSize);
            });
            modelBuilder.Entity<Color>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasMany(x => x.ProductColors).WithOne(x => x.Color).HasForeignKey(x => x.IdColor);
                entity.HasMany(x => x.OrderDetails).WithOne(x => x.Color).HasForeignKey(x => x.IdColor);
            });
            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasMany(x => x.User).WithOne(x => x.Role).HasForeignKey(x => x.IdRole);
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasMany(x => x.Orders).WithOne(x => x.User).HasForeignKey(x => x.IdUser);
            });
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
                entity.HasMany(x => x.OrderDetails).WithOne(x => x.Order).HasForeignKey(x => x.IdOrder);
            });
            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
            });
            modelBuilder.Entity<ProductColor>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
            });
            modelBuilder.Entity<ProductSize>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
            });
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
            });
            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();
            });
        }
    }
}
