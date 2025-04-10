import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './RegData.css';

const RegisterData = () => {
  const [data, setData] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/registerdata');
      // Sort data array in descending order based on percentage
      const sortedData = response.data.data.sort((a, b) => parseFloat(b.Percentage) - parseFloat(a.Percentage));
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/register/${id}`);
      setDeleteMessage('Registration request deleted successfully');
      // After deletion, refetch the data to update the UI
      fetchData();
      // Clear the delete message after 5 seconds
      setTimeout(() => {
        setDeleteMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="Reg-container" style={{marginLeft:'150px'}}>
        <center>
          <h1 style={{ marginTop: '100px' }}>Registration For Demo Lecture Entries</h1>
        </center>
        {deleteMessage && <p style={{ color: 'green' }}>{deleteMessage}</p>}
        <MDBTable style={{ margin: '0 auto' }}>
          <MDBTableHead>
            <tr className='table-primary'>
              <th>Name<hr /></th>
              <th>Email ID<hr /></th>
              <th>Class<hr /></th>
              <th>Wanna Enroll For<hr /></th>
              <th>Contact<hr /></th>
              <th>Percentage<hr /></th>
              <th>Institute<hr /></th>
              <th>Date<hr /></th>
              <th>Delete<hr /></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((item, index) => {
              return (
                <tr key={index} className={parseFloat(item.Percentage) >= 80 ? 'table-success' : parseFloat(item.Percentage) >= 70 ? 'table-info' : parseFloat(item.Percentage) >= 60 ? 'table-warning' : parseFloat(item.Percentage) >= 50 ? 'table-danger' : 'table-dark'}>
                  <td>{item.Name}</td>
                  <td>{item.EmailID}</td>
                  <td>{item.Class}</td>
                  <td>{item.Course}</td>
                  <td>{item.Contact}</td>
                  <td>{item.Percentage}</td>
                  <td>{item.Institute}</td>
                  <td>{new Date(item.SubmissionDate).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}</td>
                  <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{ width: '100px', height: '30px', fontSize: '15px', marginBottom: '20px' }} onClick={() => deleteData(item._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    </>
  );
};

export default RegisterData;
