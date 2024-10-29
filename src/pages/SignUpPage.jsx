import React, { useState } from 'react';
import '../css/signup.css';
import RegisterBaseUserForm from '../components/SignUp/RegisterBaseUserForm';
import PatientSignUp from '../components/SignUp/PatientSignUp';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [continueAsPatient, setContinueAsPatient] = useState(false);
  const [baseUserId, setBaseUserId] = useState(null);

  const navigate = useNavigate();

  const handleBaseUserCreated = (id) =>{
    setBaseUserId(id);
  }
  const handleContinueAsPatient = () =>{
    setContinueAsPatient(true);
  }
  const handleSuccessfulCreation = () =>{
    navigate("/login");
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-green-50 pt-5">
        <div className="signup-container bg-white shadow-md rounded-lg p-5 max-w-md w-full">
          {continueAsPatient ? (
            <PatientSignUp baseUserId={baseUserId}  handleSuccessfulCreation={handleSuccessfulCreation}/>
          ) : (
            <RegisterBaseUserForm handleBaseUserCreated={handleBaseUserCreated} handleContinueAsPatient={handleContinueAsPatient}/>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
