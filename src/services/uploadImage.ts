import { CLOUDINARY_NAME, CLOUDINARY_APIKEY } from '@/config';

export const uploadImage = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'SOSPatas');
  formData.append('api_key', CLOUDINARY_APIKEY);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const data: CloudinaryUploadResponse = await response.json();

  return data.url;

};

interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  existing?: boolean;
}