import React, { useState } from 'react';
import Header from './Header';
import '../css/UploadExcel.css'
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function UploadProjectPage() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const response = await fetch('https://emcapg.azurewebsites.net/api/import-employees-project/', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setIsLoading(false);
        alert('Project data updated successfully!');
        setFile(null);
        navigate('/manager');
      } else {
        setIsLoading(false);
        const error = await response.json();
        setErrorMessage(error.error);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='main' >
      <Header />
      <div style={{ display: 'flex', marginTop: '0px' }}>
        <div className='contain mt-5' style={{ width: '50%' }}>

          <h6>Download the Sample Excel format file to upload the data</h6>
          <br></br>
          <a href={"https://emcapg.azurewebsites.net/media/Sample_file/DATA_FORMAT_PROJECT.xlsx"} download style={{ justifyContent: 'center', alignItems: 'center' }}>
            <button className='button' type="submit">Download</button>
          </a>

        </div>
        <div class="vl mt-5"></div>
        <div className='contain mt-5' style={{ marginLeft: ' 120px' }} >
          <form onSubmit={handleSubmit} className='form'>
            <h1 className='h1'>Upload Excel File</h1>
            <input className='input' type="file" onChange={handleFileChange} />
            <button className='button' type="submit">Upload</button>
          </form>
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default UploadProjectPage;
