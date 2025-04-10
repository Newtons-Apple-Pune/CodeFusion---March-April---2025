import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/file/getAllFiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/api/file/download/${id}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', path);
      document.body.appendChild(link);
      link.click();
      setErrorMsg('');
    } catch (error) {
        setErrorMsg('Error while downloading file. Try again later');
    }
  };
  

  const deleteFile = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/file/deletefile/${id}`);
      setFilesList(filesList.filter(file => file._id !== id)); // Update state to remove the deleted file
      setErrorMsg('');
    } catch (error) {
      setErrorMsg('Error while deleting file. Try again later');
    }
  };

  return (
    <div className="files-container" style={{ zIndex: '100' }}>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <button 
                      className="download-button"
                      style={{
                        marginLeft: '5px',
                        color: 'blue',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        height: '2px',
                        marginTop: '2px',
                        fontSize: '12px',
                        width:'120px'
                      }}
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      } 
                    >
                      Download
                    </button>
                    {/* </td>
                    <td> */}
                    <button 
                      className="download-button"
                      style={{
                        marginLeft: '5px',
                        color: 'red',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        height: '2px',
                        marginTop: '10px',
                        fontSize: '12px'
                      }}
                      onClick={() =>
                        deleteFile(_id)
                      } 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;

