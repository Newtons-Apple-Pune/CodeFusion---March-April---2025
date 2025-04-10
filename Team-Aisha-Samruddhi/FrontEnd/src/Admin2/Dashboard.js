import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Dashboard = () => {

    const [record, setRecord] = useState([])
    const getData = () => {
        // Update the URL to point to your backend service
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(res => setRecord(res))
            .catch(error => console.error("There was an error!", error));
    }
    useEffect(() => {
        getData();
    },)

    return (
        <div class="col main pt-5 mt-3" style={{zIndex:'1000'}}>
            <Navbar/>

            <p class="lead d-none d-sm-block" style={{marginTop:'30px'}}>Add Employee Details and Records</p>
            <div class="alert alert-warning fade collapse" role="alert" id="myAlert" >
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>Data and Records</strong> Learn more about employee
            </div>
            <div class="row mb-3">
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card bg-success text-white h-100">
                        <div class="card-body bg-success" style={{ backgroundColor: "#57b960",Top:'50px' }}>
                            <div class="rotate">
                                <i class="fa fa-user fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Students</h6>
                            <h1 class="display-4">534</h1>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-danger h-100">
                        <div class="card-body bg-danger">
                            <div class="rotate">
                                <i class="fa fa-list fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Faculty</h6>
                            <h1 class="display-4">87</h1>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-info h-100">
                        <div class="card-body bg-info">
                            <div class="rotate">
                                <i class="fab fa-twitter fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Files</h6>
                            <h1 class="display-4">125</h1>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-warning h-100">
                        <div class="card-body">
                            <div class="rotate">
                                <i class="fa fa-share fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Shares</h6>
                            <h1 class="display-4">36</h1>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* <div class="row ">
                <div class="col-lg-7 col-md-6 col-sm-12">
                    <h5 class="mt-3 mb-3 text-secondary">
                        Check More Records of Employees
                    </h5>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead class="thead-light">
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Class</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.slice(0, 5).map((output) =>
                                    <tr>
                                        <td>{output.id}</td>
                                        <td>{output.name}</td>
                                        <td>{output.email}</td>
                                        <td>{output.username}</td>
                                        <td>{output.website}</td>
                                        <td></td>
                                    </tr>
                                )}
                            </tbody> */}
                        {/* </table>
                    </div>
                </div>
            </div>*/}

        </div> 
    )
}
export default Dashboard