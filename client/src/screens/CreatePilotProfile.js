import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Page1 from "../components/multiform-pilot-registration/Page1";
import Page2 from "../components/multiform-pilot-registration/Page2";
import Page3 from "../components/multiform-pilot-registration/Page3";
import Preview from "../components/multiform-pilot-registration/Preview";
import React, { Component }  from 'react';


function Multiform()
{
    //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
phoneNumber:"",
email:"",
birthday:"",
gender:"",
farmAddress:"",
city:"",
country:"",
zipcode:"",
plotType:"",
typeDetail:"",
landOwner:"",
landAddress:"",
landCity:"",
landCountry:"",
landZipcode:"",
totalArea:"",
certificateDate:"",
certificateLink:"",
driverName:"",
licenseId:""
 })

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const {value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }


// javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <Page1 nextStep={nextStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <Page2 nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
      // Only formData is passed as prop to show the final value at form submit
      case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <Page3 nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData}  />
              </Col>
            </Row>
          </Container>
        </div>
      );
        case 4:
        return (
          <div className="App">
            <Container>
              <Row>
                <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                  <Preview values={formData}  />
                </Col>
              </Row>
            </Container>
          </div>
        );
    // default case to show nothing
    default:
      return (
        <div className="App">
        </div>
      );
  }
}

export default Multiform;
