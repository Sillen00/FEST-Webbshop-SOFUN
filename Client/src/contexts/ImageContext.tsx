import axios from 'axios';
import { createContext, ReactNode, useContext } from 'react';

interface ImageContextValue {
  uploadImage: (file: File) => Promise<string>;
  getImage: (imageID: string) => Promise<string>;
}

export const ImageContext = createContext<ImageContextValue>(null as any);
export const useImage = () => useContext(ImageContext);

interface Props {
  children: ReactNode;
}

export default function ImageProvider({ children }: Props) {
  // FUNCTION TO UPLOAD IMAGE TO SERVER -----------------------------------------------------------
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/image', formData, {
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

  // GET IMAGE FROM SERVER -----------------------------------------------------------------------

  const getImage = async (imageID: string) => {
    try {
      const response = await axios.get(`/api/image/${imageID}`, {
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      });

      

      const file = new File([response.data], 'image.jpg', { type: 'image/jpeg' });
      const url = URL.createObjectURL(file);

      return url;
    } catch (error) {
      console.error('Error getting image:', error);
      throw error;
    }

    // try {
    //     const response = await axios.get(`/api/image/${imageID}`);
    //     const url = response.data.imageUrl;
    //     return url;
    //   } catch (error) {
    //     console.error('Error getting image:', error);
    //     throw error;
    //   }
  };

  // RETURN -------------------------------------------------------------------------------------

  return (
    <ImageContext.Provider
      value={{
        uploadImage,
        getImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
