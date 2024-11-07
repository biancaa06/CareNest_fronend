import React, { useState } from 'react';
import '../css/signup.css';
import RegisterBaseUserForm from '../components/SignUp/RegisterBaseUserForm';
import PatientSignUp from '../components/SignUp/PatientSignUp';
import { useNavigate } from 'react-router-dom';
import CaretakerSignUp from '../components/SignUp/CaretakerSignUp';

const SignUp = () => {

  const [continueAsPatient, setContinueAsPatient] = useState(false);
  const [continueAsCaretaker, setContinueAsCaretaker] = useState(false);
  const [baseUserId, setBaseUserId] = useState(null);

  const navigate = useNavigate();

  const handleBaseUserCreated = (id) =>{
    setBaseUserId(id);
  }
  const handleContinueAsPatient = () =>{
    setContinueAsPatient(true);
    setContinueAsCaretaker(false);
  }

  const handleContinueAsCaretaker = () =>{
      setContinueAsCaretaker(true);
      setContinueAsPatient(false);
  }

  const handleSuccessfulCreation = () =>{
    navigate("/login");
  }

  return (
    <>
      <div className="page-background">
        <div className="signup-container bg-white shadow-md rounded-lg p-5 max-w-md w-full">
        {continueAsPatient ? (
            <PatientSignUp baseUserId={baseUserId} handleSuccessfulCreation={handleSuccessfulCreation} />
          ) : continueAsCaretaker ? (
            <CaretakerSignUp baseUserId={baseUserId} handleSuccessfulCreation={handleSuccessfulCreation} />
          ) : (
            <RegisterBaseUserForm 
              handleBaseUserCreated={handleBaseUserCreated} 
              handleContinueAsPatient={handleContinueAsPatient} 
              handleContinueAsCaretaker={handleContinueAsCaretaker} 
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
