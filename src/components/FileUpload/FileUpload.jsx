import React, { useState, useEffect, useRef } from 'react';
import { getBase64 } from '../../custom/utils';

export default function FileUpload({
  accept,
  handleUpload,
  click,
  className,
  maxSize = 1024 * 1024
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const inputFileRef = useRef(null);

  useEffect(() => {
    console.log('click', click);
    if (click) inputFileRef.current.click();

    return () => {
      handleUpload(null);
    };
  }, [click]);

  useEffect(() => {
    if (!selectedFile) return;

    console.log(
      'before handleUpload',
      selectedFile?.size > maxSize ? 'File too big' : 'file ok!'
    );

    if (selectedFile.size > maxSize) {
      setSelectedFile(null);
      return handleUpload(null, 'File too big');
    }

    getBase64(selectedFile)
      .then((base64) => {
        // console.log('base64', base64);
        handleUpload(base64, selectedFile.siz);
      })
      .catch((err) => {
        console.log('err', err);
      });

    // if (selectedFile) handleUpload(URL.createObjectURL(selectedFile));

    return;
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile((prev) => event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <div className={`file-upload w-30 ${className}`}>
      {/* <button>
        <label htmlFor="upload-photo">Upload...</label>
      </button> */}
      <input
        ref={inputFileRef}
        className="w-36"
        type="file"
        name="file"
        accept={accept}
        onChange={changeHandler}
        id="upload-photo"
      />
      {/* <div>
        <button onClick={handleSubmission}>Submit</button>
      </div> */}
    </div>
  );
}
