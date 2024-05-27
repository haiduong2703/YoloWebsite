using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;
using YoloEcommerce.DTO.ProductImage;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;

namespace YoloEcommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public ProductImageController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost("upload")]
        public IActionResult UploadImage([FromBody]ProductImageDTO imageDatas)
        {
            try
            {
                List<string> filePaths = new List<string>();
                List<string> fileName = new List<string>();
                // Giả định imageData.Base64String chứa dữ liệu ảnh dưới dạng base64
                /*var bytes = Convert.FromBase64String(imageData.Base64String);

                // Tạo một đường dẫn file để lưu ảnh
                var filePath = Path.Combine("wwwroot\\UploadedImages", Guid.NewGuid().ToString() + ".jpg");

                // Ghi dữ liệu byte vào file
                System.IO.File.WriteAllBytes(filePath, bytes);

                return Ok(new { message = "Ảnh đã được upload thành công!", filePath = filePath });*/
                foreach (var imageData in imageDatas.Base64String)
                {
                    // Giả định imageData.Base64String chứa dữ liệu ảnh dưới dạng base64
                    var bytes = Convert.FromBase64String(imageData);

                    // Tạo một đường dẫn file để lưu ảnh
                    var filePath = Path.Combine("wwwroot\\UploadedImages",Guid.NewGuid().ToString() + ".jpg");
                    var fileNameConver = Path.GetFileName(filePath);
                    // Ghi dữ liệu byte vào file
                    System.IO.File.WriteAllBytes(filePath, bytes);
                    fileName.Add(fileNameConver);
                    filePaths.Add(filePath);
                }

                return Ok(new { message = "Các ảnh đã được upload thành công!", filePaths = fileName });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Có lỗi xảy ra trong quá trình upload ảnh.", error = ex.Message });
            }
        }
        [HttpGet("{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            /*// Đọc ảnh từ thư mục UploadImage
            // imageName là tên file ảnh (ví dụ: uploaded-image.jpg)
            var imagePath = Path.Combine("UploadedImages", imageName);

            if (System.IO.File.Exists(imagePath))
            {
                var imageBytes = System.IO.File.ReadAllBytes(imagePath);
                return File(imageBytes, "image/jpeg"); // Trả về ảnh dưới định dạng JPEG
            }
            else
            {
                return NotFound(); // Trả về lỗi 404 nếu không tìm thấy ảnh
            }*/
            if (_hostingEnvironment.WebRootPath == null)
            {
                return BadRequest("Hosting environment web root path is null.");
            }

            // Đường dẫn thư mục chứa ảnh
            var imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "UploadedImages", imageName);

            if (System.IO.File.Exists(imagePath))
            {
                // Tạo đường dẫn URL để truy cập vào ảnh
                var imageUrl = Url.Content("https://localhost:44324/UploadedImages/" + imageName);
                return Ok(new { imageUrl }); // Trả về URL của ảnh
            }
            else
            {
                return NotFound(); // Trả về lỗi 404 nếu không tìm thấy ảnh
            }
        }
    }
}
