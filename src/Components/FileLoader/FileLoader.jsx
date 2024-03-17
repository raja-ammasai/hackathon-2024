import React, { useState, useRef } from 'react';
import axios from 'axios';

function FileLoader(props) {
  const { handleSetFileData, handleSetLoading } = props || {};
  const ref = useRef();
  const [file, setFile] = useState()
  const [uploadedFileURL, setUploadedFileURL] = useState(null)
  const [entityName, setEntityName] = useState();

  // const CancelToken = axios.CancelToken;
  // let cancel;

  const reset = () => {
    ref.current.value = "";
    setEntityName("");
    handleSetLoading(false);
  };

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  function handleEntityName(event) {
    setEntityName(event.target.value);
  }


  function handleSubmit(event) {
    event.preventDefault();
    handleSetLoading(true);
    const url = `/esg/benchmark/upload/v1`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file?.name);
    formData.append('entityName', entityName);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      axios.post(url, formData, config).then((response) => {
        setUploadedFileURL(response.data.fileUrl);
        handleSetFileData(response.data, entityName);
        reset();
      }).catch((error) => {
        // if (axios.isCancel(error)) {
        //   console.log("axios catch --> post Request canceled");
        // }
        reset();
      })
    }
    catch (e) {
      // if (axios.isCancel(error)) {
      //   console.log("try-catch --> post Request canceled");
      // }
      reset();
    }
    setTimeout(() => {
      // if (cancel !== undefined) {
      //   console.log("timeout --> post Request canceled");
      //   cancel();
      //   reset();
      // }
      reset();
    }, 120000);
  }

  return (
    <div className="hk-upload">
      <form onSubmit={handleSubmit}>
        <span className='hk-entityNameLabel'>
          {"Entity Name"}{" "}
        </span>
        <input type="text" className="hk-entityNameInput" name="entityName" value={entityName} onChange={handleEntityName} />
        <input type="file" className="hk-upload-file" ref={ref} onChange={handleChange} />
        <button disabled={!entityName} className={"hk-upload-btn"} type="submit">Upload File</button>
      </form>
      {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content" />}
    </div>
  );
}

export default FileLoader;