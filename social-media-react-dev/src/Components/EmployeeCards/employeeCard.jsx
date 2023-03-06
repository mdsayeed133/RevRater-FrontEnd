import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employeeCard.css'



const EmployeeCard = ({ employee }) => {
    const navigate = useNavigate();
    const [score, setScore]= useState(0.00);
    const employeeId = employee.id;
    
    const seeProfile = () => {
        navigate(`/employee-profile/${employeeId}`);
    }

    const getScore= async(employeeId)=>{
        try{
            const response = await axios.get(`http://localhost:5000/RevRater/rating/employee/${employeeId}/average`);
            if(response.status === 200){
                setScore(response.data);}
        }catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        getScore(employeeId);
    }, [employee, employeeId]);
    
    
    return (
        <div className="card">
            <div className="employee-img">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
            </div>
            <div className="card-body">
                <h5 className="card-title">{`${employee.firstName} ${employee.lastName}`}</h5>
                <p className="card-text">Department: <em>{employee.department.title}</em></p>
                <p className="card-text">Rating: {score} </p>
                <div className="button">
                    <button className="button" onClick={seeProfile}>See Profile</button>
                </div>
            </div>
        </div>
) 
}

export default EmployeeCard