import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './RegData.css';
import './studentsdata.css'

const TeacherData = () => {
  document.body.style.backgroundColor = '#130f40';
  const [data, setData] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/teacherdata');
      setData(response.data.data); // response contains data array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/teacher/${id}`);
      setDeleteMessage('Teacher deleted successfully');
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

  useEffect(() => {
    const results = data.filter(item =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Education.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  

  return (
    <div className='stdc'>
      <Navbar />
      <div className="std-container">
    <center>
        <h1 style={{marginTop:'100px'}} >Teacher's Data</h1>
    </center>
    {deleteMessage && <p style={{ color: 'green' }}>{deleteMessage}</p>}
    <div class="search-box">
    <button class="btn-search" style={{marginTop:'3px',marginRight:'2px'}}><i class="fas fa-search" ></i></button>
    <input type="text" className="input-search" placeholder="Type to Search..." value={searchTerm} onChange={handleSearchChange}/>
  </div><br/>
            
            {/* <input type="text" className="input-search" placeholder="Type to Search..." value={searchTerm} onChange={handleSearchChange}/> */}

        <MDBTable style={{ margin: '0 auto' }}>
          <MDBTableHead>
            <tr className='table-primary'>
              <th>Name<hr /></th>
              <th>Gender<hr /></th>
              <th> Education<hr /></th>
              <th>Email ID<hr /></th>
              <th>Join Date<hr /></th>
              <th>Address<hr /></th>
              <th>Contact<hr /></th>
              <th>Alternate Contact<hr /></th>
              <th>LoginID<hr /></th>
              <th>Delete<hr /></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {searchResults.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Name}</td>
                  <td>{item.Gender}</td>
                  <td>{item.Education}</td>
                  <td>{item.EmailID}</td>
                  <td>{item.JoinDate}</td>
                  <td>{item.Address}</td>
                  <td>{item.Contact}</td>
                  <td>{item.AlternateContact}</td>
                  <td>{item.LoginID}</td>
                  <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{ width: '100px', height: '30px', fontSize: '15px', marginBottom: '20px' }} onClick={() => deleteData(item._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        <br/><br/><br/>
      </div>
    </div>
  );
};


export default TeacherData;
