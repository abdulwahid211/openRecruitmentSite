const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file); // this converts to base64 string
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert file to Base64');
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export default convertFileToBase64;
