import React, { useState } from 'react';
import axios from 'axios';

function FileLoader(props) {
  const { handleSetFileData } = props || {};
  const [file, setFile] = useState()
  const [uploadedFileURL, setUploadedFileURL] = useState(null)
  const [entityName, setEntityName] = useState();
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  function handleEntityName(event) {
    setEntityName(event.target.value);
  }

  let [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true);
    const url = 'https://wellsfargo-genai24-8271.uc.r.appspot.com/esg/benchmark/upload/v1';
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
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        return error;
      });
    }
    catch (e) {
      setLoading(false);

    }
  }

  return (
    <div className="hk-upload">
      <form onSubmit={handleSubmit}>
        <span className='hk-entityNameLabel'>
          {"Entity Name"}{" "}
        </span>
        <input type="text" className="hk-entityNameInput" name="entityName" value={entityName} onChange={handleEntityName} />
        <input type="file" className="hk-upload-file" onChange={handleChange} />
        <button disabled={!entityName} className={"hk-upload-btn"} type="submit">Upload File</button>
      </form>
      {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content" />}
      {loading && <div class="ring">Loading
        <span></span>
      </div>}
    </div>
  );
}

export default FileLoader;