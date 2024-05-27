using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YoloEcommerce.Entities;
using YoloEcommerce.Interface.Category;
using YoloEcommerce.Interface.Color;
using YoloEcommerce.Interface.Contact;
using YoloEcommerce.Interface.Order;
using YoloEcommerce.Interface.Product;
using YoloEcommerce.Interface.Size;
using YoloEcommerce.Interface.User;
using YoloEcommerce.Interface.VnPay;
using YoloEcommerce.Services.Category;
using YoloEcommerce.Services.Color;
using YoloEcommerce.Services.Contact;
using YoloEcommerce.Services.Order;
using YoloEcommerce.Services.Product;
using YoloEcommerce.Services.Size;
using YoloEcommerce.Services.User;
using YoloEcommerce.Services.VnPay;

namespace YoloEcommerce
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            /*// Inject IWebHostEnvironment vào dịch vụ
            services.AddSingleton<IWebHostEnvironment>(provider => provider.GetRequiredService<IWebHostEnvironment>());*/
            services.AddControllers();
            services.AddDbContext<MyDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("MyDB"));
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "YoloEcommerce", Version = "v1" });
            });
            services.AddTransient<IProductServices, ProductServices>();
            services.AddTransient<IUserServices, UserServices>();
            services.AddTransient<IColorServices, ColorServices>();
            services.AddTransient<ISizeServices, SizeServices>();
            services.AddTransient<ICategoryServices, CategoryServices>();
            services.AddTransient<IOrderServices, OrderServices>();
            services.AddTransient<IVnPayServices, VnPayServices>();
            services.AddTransient<IContactServices, ContactServices>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.WebRootPath == null)
            {
                env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "YoloEcommerce v1"));
            }
            app.UseCors(builder =>
            {
                builder
                    .AllowAnyOrigin() // Cho phép truy cập từ bất kỳ nguồn nào
                    .AllowAnyMethod() // Cho phép sử dụng bất kỳ phương thức nào (GET, POST, PUT, DELETE, vv.)
                    .AllowAnyHeader(); // Cho phép sử dụng bất kỳ tiêu đề nào trong yêu cầu
            });
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
