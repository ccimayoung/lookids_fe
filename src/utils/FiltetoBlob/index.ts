function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
  
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      } else {
        reject(new Error('파일을 Blob으로 변환하는 중 오류 발생'));
      }
    };
  
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export default fileToBlob;