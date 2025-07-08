import { CV } from '../../models/CV';

export function DownloadCVFile(downloadCV: CV) {
  const fileBlob = DataURItoBlob(downloadCV.file, downloadCV.type);
  const url = window.URL.createObjectURL(fileBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = downloadCV.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function DataURItoBlob(dataURI: string, mimeType: string): Blob {
  // Remove the data URI scheme and extract the base64 string
  const base64Index = dataURI.indexOf(';base64,');
  const base64 = dataURI.substring(base64Index + 8);
  const byteString = atob(base64);

  // Convert byte string to ArrayBuffer
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([intArray], { type: mimeType });
}
