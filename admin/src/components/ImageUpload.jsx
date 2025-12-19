import { useState } from 'react';
import axios from 'axios';

function ImageUpload({ onImageUpload, currentImage }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      onImageUpload(response.data.imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload">
      <label className="upload-label">
        <input type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
        <div className="upload-area">
          {preview ? (
            <img src={preview} alt="Preview" className="image-preview" />
          ) : (
            <div className="upload-placeholder">
              <span>📷</span>
              <p>Click to upload image</p>
            </div>
          )}
          {uploading && <div className="upload-overlay">Uploading...</div>}
        </div>
      </label>
    </div>
  );
}

export default ImageUpload;