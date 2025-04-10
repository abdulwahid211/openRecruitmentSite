import { CV } from '../models/CV';

export function DownloadCVFile(downloadCV: CV) {
  const fileBlob = DataURItoBlob(downloadCV.file, downloadCV.type);
  const newFile = new File([fileBlob], downloadCV.filename, {
    type: downloadCV.type,
  });

  const url = window.URL.createObjectURL(newFile);
  window.open(url);
}

export function DataURItoBlob(dataURI: string, _type: any) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: _type });
  return blob;
}
