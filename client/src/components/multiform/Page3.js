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
    if (validator.isEmpty(values.farmAddress)) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
        <Card.Title>Farm Information</Card.Title>
          <Form onSubmit={submitFormData}>
            <Form.Group className="mb-3">
              <Form.Label>Plot Type</Form.Label>
     {['radio'].map((type) => (
        <div key={`reverse-${type}`} 
        className="mb-3">
          <Form.Check
            onChange={handleFormData("plotType")}
            label="livestock"
            name="plotType"
            value="livestock"
            type={type}
            id={`reverse-${type}-1`}
          />
          <Form.Check
            onChange={handleFormData("plotType")}
            label="crop"
            name="plotType"
            value="crop"
            type={type}
            id={`reverse-${type}-2`}
          />
          <Form.Check
            onChange={handleFormData("plotType")}
            label="fruit"
            name="plotType"
            value="fruit"
            type={type}
            id={`reverse-${type}-3`}
          />
          <Form.Check
            onChange={handleFormData("plotType")}
            label="nursery"
            name="plotType"
            value="nursery"
            type={type}
            id={`reverse-${type}-3`}
          />
        </div>
      ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type(in detail)</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="typeDetail"
                onChange={handleFormData("city")}
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
              <Form.Label>Country</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="country"
                onChange={handleFormData("country")}
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
              <Form.Label>ZipCode</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="zipcode"
                onChange={handleFormData("zipcode")}
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

              <Button variant="primary" onClick={nextStep} type="submit">
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
