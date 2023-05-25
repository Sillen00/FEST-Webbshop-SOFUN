import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ImageContextValue {
  image: string;
}

export const ImageContext = createContext<ImageContextValue>(null as any);
export const useOrder = () => useContext(ImageContext);

interface Props {
  children: ReactNode;
}

export default function ImageProvider({ children }: Props) {
  const [image, setImage] = useState('');

  const handleUpload = async () => {
    // const formData = new FormData();
    // formData.append('image', selectedFile);

    // await axios
    //   .post('http://localhost:3000/api/image', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(function (response) {
    //     console.log('Image uploaded successfully');
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log('Image upload failed');
    //     console.log(error);
    //   });
  };

  return (
    <ImageContext.Provider
      value={{
        image,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
