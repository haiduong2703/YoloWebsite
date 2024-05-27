// // import axios from 'axios'
// // const product_01_image_01 = require('../images/products/product-01 (1).jpg')
// // const product_01_image_02 = require('../images/products/product-01 (2).jpg')
// // // const product_01_image_03 = require('../images/products/product-01 (3).jpg')

// // const product_02_image_01 = require('../images/products/product-02 (1).jpg')
// // const product_02_image_02 = require('../images/products/product-02 (2).jpg')

// // const product_03_image_01 = require('../images/products/product-03 (1).jpg')
// // const product_03_image_02 = require('../images/products/product-03 (2).jpg')

// // const product_04_image_01 = require('../images/products/product-04 (1).jpg')
// // const product_04_image_02 = require('../images/products/product-04 (2).jpg')

// // const product_05_image_01 = require('../images/products/product-05 (1).jpg')
// // const product_05_image_02 = require('../images/products/product-05 (2).jpg')

// // const product_06_image_01 = require('../images/products/product-06 (1).jpg')
// // const product_06_image_02 = require('../images/products/product-06 (2).jpg')

// // const product_07_image_01 = require('../images/products/product-07 (1).jpg')
// // const product_07_image_02 = require('../images/products/product-07 (2).jpg')

// // const product_08_image_01 = require('../images/products/product-08 (1).jpg')
// // const product_08_image_02 = require('../images/products/product-08 (2).jpg')

// // const product_09_image_01 = require('../images/products/product-09 (1).jpg')
// // const product_09_image_02 = require('../images/products/product-09 (2).jpg')

// // const product_10_image_01 = require('../images/products/product-10 (1).jpg')
// // const product_10_image_02 = require('../images/products/product-10 (2).jpg')

// // const product_11_image_01 = require('../images/products/product-11 (1).jpg')
// // const product_11_image_02 = require('../images/products/product-11 (2).jpg')

// // const product_12_image_01 = require('../images/products/product-12 (1).jpg')
// // const product_12_image_02 = require('../images/products/product-12 (2).jpg')

// // const products = [
// //     {
// //         title: "Áo thun Dinosaur 01",
// //         price: '189000',
// //         image01: product_01_image_01,
// //         image02: product_01_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["white", "red", "orange"],
// //         slug: "ao-thun-dinosaur-01",
// //         size: ["s", "m", "l", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Dinosaur 02",
// //         price: '159000',
// //         image01: product_02_image_01,
// //         image02: product_02_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["white", "red", "blue"],
// //         slug: "ao-thun-dinosaur-02",
// //         size: ["s", "m"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Dinosaur 03",
// //         price: '190000',
// //         image01: product_03_image_01,
// //         image02: product_03_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["white", "red", "orange", "yellow"],
// //         slug: "ao-thun-dinosaur-03",
// //         size: ["m"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Polo 04",
// //         price: '194000',
// //         image01: product_04_image_01,
// //         image02: product_04_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["white", "orange", "blue"],
// //         slug: "ao-thun-polo-04",
// //         size: ["xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Polo 05",
// //         price: '194000',
// //         image01: product_05_image_01,
// //         image02: product_05_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["white", "pink"],
// //         slug: "ao-thun-polo-05",
// //         size: ["xxl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Polo 06",
// //         price: '194000',
// //         image01: product_06_image_01,
// //         image02: product_06_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["black"],
// //         slug: "ao-thun-polo-06",
// //         size: ["s", "m", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo somi caro 07",
// //         price: '194000',
// //         image01: product_07_image_01,
// //         image02: product_07_image_02,
// //         categorySlug: "ao-somi",
// //         colors: ["white", "red", "orange", "blue"],
// //         slug: "ao-somi-caro-07",
// //         size: ["l", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo somi dài tay 08",
// //         price: '194000',
// //         image01: product_08_image_01,
// //         image02: product_08_image_02,
// //         categorySlug: "ao-somi",
// //         colors: ["white", "red", "black"],
// //         slug: "ao-somi-dai-tay-08",
// //         size: ["s", "m", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo somi tay dài 09",
// //         price: '194000',
// //         image01: product_09_image_01,
// //         image02: product_09_image_02,
// //         categorySlug: "ao-somi",
// //         colors: ["white", "blue"],
// //         slug: "ao-somi-tay-dai-09",
// //         size: ["m"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Quần jean phong cách 10",
// //         price: '194000',
// //         image01: product_10_image_01,
// //         image02: product_10_image_02,
// //         categorySlug: "quan-jean",
// //         colors: ["blue", "black"],
// //         slug: "quan-jean-phong-cach-10",
// //         size: ["l"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Quần jean 11",
// //         price: '194000',
// //         image01: product_11_image_01,
// //         image02: product_11_image_02,
// //         categorySlug: "quan-jean",
// //         colors: ["blue", "black"],
// //         slug: "quan-jean-11",
// //         size: ["s", "m", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Quần jean 12",
// //         price: '194000',
// //         image01: product_12_image_01,
// //         image02: product_12_image_02,
// //         categorySlug: "quan-jean",
// //         colors: ["blue"],
// //         slug: "quan-jean-12",
// //         size: ["s", "m", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Dinosaur 13",
// //         price: '189000',
// //         image01: product_01_image_01,
// //         image02: product_01_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["white", "red"],
// //         slug: "ao-thun-dinosaur-13",
// //         size: ["s", "m", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Dinosaur 14",
// //         price: '159000',
// //         image01: product_02_image_01,
// //         image02: product_02_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["white", "blue"],
// //         slug: "ao-thun-dinosaur-14",
// //         size: ["s", "m"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo thun Dinosaur 15",
// //         price: '190000',
// //         image01: product_03_image_01,
// //         image02: product_03_image_02,
// //         categorySlug: "ao-thun",
// //         colors: ["red", "blue"],
// //         slug: "ao-thun-dinosaur-15",
// //         size: ["xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo somi dài tay 16",
// //         price: '194000',
// //         image01: product_08_image_01,
// //         image02: product_08_image_02,
// //         categorySlug: "ao-somi",
// //         colors: ["blue", "black"],
// //         slug: "ao-somi-dai-tay-16",
// //         size: ["m", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Áo somi tay dài 17",
// //         price: '194000',
// //         image01: product_09_image_01,
// //         image02: product_09_image_02,
// //         categorySlug: "ao-somi",
// //         colors: ["white", "blue"],
// //         slug: "ao-somi-tay-dai-17",
// //         size: ["s", "l", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     {
// //         title: "Quần jean phong cách 18",
// //         price: '194000',
// //         image01: product_10_image_01,
// //         image02: product_10_image_02,
// //         categorySlug: "quan-jean",
// //         colors: ["blue", "black"],
// //         slug: "quan-jean-phong-cach-18",
// //         size: ["s", "m", "l", "xl"],
// //         description: "Áo Khoác Jacket Dù Unisex Form Rộng Local Brand iGB Yolo Màu Đen Dây Kéo Có Nón Thiết kế lần này là một thiết kế mang ý nghĩa về cuộc sống. YOLO you only live once  chính là một lời động viên, cổ vũ chúng ta hãy tự tin và thêm yêu cuộc sống. Dám làm những điều bản thân mong muốn, thực hiện ước mơ ấp ủ, sống không hối tiếc.Chi tiết sản phẩm:Chất liệu: dù, đứng formLót lớp polyester mặt troBo cổ tay và tà Áo được trang bị 2 túi ngoài, 1 túi trong ngay ngDây kéo dọc Mặt trước: họa tiết in tinh xảo trên mặt Mặt sau: họa tiết in tinh xảo trên mặt acketlocalbrand #aokhoaclocalbrand #aokhoacLanina #igb #imagodbreaker #igblocalbrand #localbrand #local #brand hoodielocalbrand #quanlocalbrand #aolocalbrandnu #streetwear #aobomber #aokhoacbomber"
// //     },
// //     // 18 products
// // ]
// let products = [];

// async function fetchProducts() {
//     try {
//         const response = await axios.get('https://localhost:44396/api/Products'); // Thay URL_API_CUA_BAN bằng URL thực tế của API bạn muốn sử dụng
//         const apiData = response.data; // Dữ liệu từ API

//         // Duyệt qua dữ liệu từ API và tạo mảng products mới
//         const newProducts = apiData.map((apiProduct, index) => ({
//             title: apiProduct.title,
//             price: apiProduct.price,
//             image01: require(`../images/products/${apiProduct.image01}`),
//             image02: require(`../images/products/${apiProduct.image02}`),
//             categorySlug: apiProduct.categorySlug,
//             colors: apiProduct.colors,
//             slug: apiProduct.slug,
//             size: apiProduct.size,
//             description: apiProduct.description,
//         }));

//         // Cập nhật biến products với dữ liệu mới từ API
//         products = newProducts;

//     } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu từ API:', error);
//     }
// }
// fetchProducts();

// const getAllProducts = () => {
//     return products;
// };
// const getProducts = (count) => {
//     const max = products.length - count
//     const min = 0
//     const start = Math.floor(Math.random() * (max - min) + min)
//     return products.slice(start, start + count)
// }
// const getProductBySlug = (slug) => products.find(e => e.slug === slug)

// const getCartItemsDetal = (cartItems) => {
//     let res = [];
//     if (cartItems.length > 0) {
//         cartItems.forEach(e => {
//             res.push({
//                 ...e,
//                 product: getProductBySlug(e.slug)
//             })
//         })
//     }
//     return res
// }

// const productData = {
//     getAllProducts,
//     getProducts,
//     getProductBySlug,
//     getCartItemsDetal
// }
// export default productData