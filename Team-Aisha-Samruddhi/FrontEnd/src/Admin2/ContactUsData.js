import Navbar from './Navbar'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './RegData.css';

const ContactUsData = () => {
  const [data, setData] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/contactdata');
      setData(response.data.data); // response contains data array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/contact/${id}`);
      setDeleteMessage('ContactUs query deleted successfully');
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
          <h1 style={{ marginTop: '100px' }}> Contact Us Queries</h1>
        </center>
        {deleteMessage && <p style={{ color: 'green' }}>{deleteMessage}</p>}
        <MDBTable style={{ margin: '0 auto' }}>
          <MDBTableHead>
            <tr className='table-primary'>
              <th>Name<hr /></th>
              <th>Email ID<hr /></th>
              <th>Message<hr /></th>
              <th>Date<hr /></th>
              <th>Delete<hr /></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Name}</td>
                  <td>{item.EmailID}</td>
                  <td>{item.Message}</td>
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


export default ContactUsData
