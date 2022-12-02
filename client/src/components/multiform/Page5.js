import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [error, setError] = useState(false);

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
  
      nextStep();
    
  };
  return (
    <>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
        <Card.Title>Driving License Information</Card.Title>
          <Form onSubmit={submitFormData}>
            <Form.Group className="mb-3">
              <Form.Label>Driver License Name</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="driverName"
                onChange={handleFormData("driverName")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>License ID</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="licenseId"
                onChange={handleFormData("licenseId")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            
              
            </Form.Group>
            
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/* <Button variant="primary" onClick={prevStep}>
                Previous
              </Button> */}

              <Button variant="primary" type="submit">
              Continue
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepTwo;
