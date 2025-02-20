export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File[]>>, setDocumentFileNames: React.Dispatch<React.SetStateAction<string[]>>, setDeleteFileNames: React.Dispatch<React.SetStateAction<string[]>>) => {
  // React.ChangeEvent<HTMLInputElement> = input태그에서 변경이벤트
  // React.Dispatch<React.SetStateAction<File[]>> = 상태 업데이트 타입, 배열형태의 File객체
  // React.Dispatch<React.SetStateAction<string[]>> = 상태 업데이트 타입, 배열형태의 문자열 배열
  if (e.target.files) {
    const filesArray = Array.from(e.target.files);
    setFile((prev) => [...prev, ...filesArray]);
    setDocumentFileNames((prev) => [...prev, ...filesArray.map((file) => file.name)]);
    setDeleteFileNames((prev) => prev.filter((name) => !filesArray.some((file) => file.name === name)));
  }
};
export const addDeleteFileName = (fileName: string, setFile: React.Dispatch<React.SetStateAction<File[]>>, setDocumentFileNames: React.Dispatch<React.SetStateAction<string[]>>, setDeleteFileNames: React.Dispatch<React.SetStateAction<string[]>>) => {
  setFile((prev) => prev.filter((file) => file.name !== fileName));
  setDocumentFileNames((prev) => prev.filter((name) => name !== fileName));
  setDeleteFileNames((prev) => [...prev, fileName]);
};