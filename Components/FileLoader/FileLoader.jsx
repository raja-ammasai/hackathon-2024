import React, { useState, useRef } from 'react';
import axios from 'axios';

function FileLoader(props) {
  const { handleSetFileData, handleSetLoading } = props || {};
  const ref = useRef();
  const [file, setFile] = useState()
  const [entityName, setEntityName] = useState();


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
    const data = {
      file,
      'fileName': file?.name,
      'entityName': entityName
    }

    axios({
      method: "post",
      url,
      timeout: 1000 * 300, // Wait for 5 minutes
      headers: {
        'content-type': 'multipart/form-data',
      },
      data
    }).then(response => {
      const serverResponse = response?.data;
      handleSetFileData(serverResponse, entityName);
      reset();
    }).catch(error => {
      reset();
      console.log(error);
    });
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
    </div>
  );
}

export default FileLoader;