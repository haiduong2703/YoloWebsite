import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedFile(reader.result);
            console.log(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        try {
            const response = await axios.post('https://localhost:44324/api/ProductImage/UploadImage/upload', {
                Base64String: selectedFile.split(',')[1] // Loại bỏ phần prefix của base64 string
            });
            // const res = await axios.get("https://localhost:44324/api/Product/GetAll")
            // console.log(res);
            console.log('Upload thành công:', response.data);
            console.log()
            await axios.get(`https://localhost:44324/api/ProductImage/GetImage/${response.data.filePath}`)
                .then(res => {
                    console.log(res.data.imageUrl); // Sử dụng res.data.imageUrl thay vì res.imagePath
                    setImageUrl("https://" + res.data.imageUrl); // Sử dụng res.data.imageUrl thay vì res.imagePath
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Ảnh</button>
            {imageUrl && (
                <img src={imageUrl} alt="Uploaded Image" style={{ maxWidth: '20%' }} />
            )}
        </div>
    );
};

export default ImageUpload;