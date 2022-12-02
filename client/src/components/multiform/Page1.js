import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.name) ||
      validator.isEmpty(values.email)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };

  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="Name"
                defaultValue={values.firstName}
                type="text"
                placeholder="Name"
                onChange={handleFormData("name")}
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
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="Phone Number"
                defaultValue={values.lastName}
                type="number"
                placeholder="Phone Number"
                onChange={handleFormData("phoneNumber")}
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="Email"
                defaultValue={values.lastName}
                type="email"
                placeholder="Email"
                onChange={handleFormData("email")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
              <Form.Group className="mb-3">
              <Form.Label>BirthDay</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="BirthDay"
                defaultValue={values.lastName}
                type="text"
                placeholder="BirthDay"
                onChange={handleFormData("birthday")}
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
              <Form.Label>Gender</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="Gender"
                defaultValue={values.lastName}
                type="text"
                placeholder="Gender"
                onChange={handleFormData("gender")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            </Form.Group>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepOne;
