import { ChangeEvent } from 'react';

export const onInputFileChange = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (file: File) => void
) => {
  if (!e.target.files) return;
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  callback(files[0]);
};
