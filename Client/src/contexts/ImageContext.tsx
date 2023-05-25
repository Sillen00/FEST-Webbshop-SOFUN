import axios from 'axios';
import { createContext, ReactNode, useContext } from 'react';

interface ImageContextValue {
  uploadImage: (file: File) => Promise<string>;
}

export const ImageContext = createContext<ImageContextValue>(null as any);
export const useImage = () => useContext(ImageContext);

interface Props {
  children: ReactNode;
}

export default function ImageProvider({ children }: Props) {
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/api/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from image upload: ', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return (
    <ImageContext.Provider
      value={{
        uploadImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
