import React from "react";
import { Card,Button } from "react-bootstrap";
import axios from "axios";
import { add } from "date-fns";


// function saveFarmerDetails (props)  {
//   // 👇️ navigate to /contacts
//   // navigate.push('/');
//   // const result = await axios.post('/api/farmers/farmerDetails',values)
//    console.log(props)
// };

const Final = ({ values,props }) => {

    //destructuring the object from values
  const { name,
    phoneNumber,
    email,
    birthday,
    gender,
    certificateId,
    pilotName,
    country,
    address,  
    city,
    driverName,
    licenseId } = values;

    const savePilotDetails = async (props) => {
      // 👇️ navigate to /contacts
      // navigate.push('/');
      // const result = await axios.post('/api/farmers/farmerDetails',values)
      axios.put('/api/users/updatePilotRoleAndRegistrationStatus', { email: JSON.parse(localStorage.getItem("currentUser")).email });

    console.log(values)
     const result = await axios.post('/api/farmers/pilotDetails',values).then((res)=>{
        console.log("asasda",res);
        window.location.href='/'
     })
    };
    //  console.log(result)
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
        <Card.Title>Review Pilot Registration Information</Card.Title>

          <p>
            <strong>Name :</strong> {name}{" "}
          </p>
          <p>
            <strong>Phone Number :</strong> {phoneNumber}{" "}
          </p>
          <p>
            <strong>Email :</strong> {email}{" "}
          </p>
          <p>
            <strong>Birthday :</strong> {birthday}{" "}
          </p>
          <p>
            <strong>Gender :</strong> {gender}{" "}
          </p>
          <p>
            <strong>Certificate Id :</strong> {certificateId}{" "}
          </p>
          <p>
            <strong>Pilot Name :</strong> {pilotName}{" "}
          </p>
          <p>
            <strong>Country :</strong> {country}{" "}
          </p>
          <p>
            <strong>Address :</strong> {address}{" "}
          </p>
          <p>
            <strong>City :</strong> {city}{" "}
          </p>
          <p>
            <strong>Driver Name :</strong> {driverName}{" "}
          </p>
          <p>
            <strong>License Id :</strong> {licenseId}{" "}
          </p>
        </Card.Body>
        <div style={{ display: "flex", justifyContent: "space-around" }}>

              <Button variant="primary" type="submit" onClick={()=>savePilotDetails(props)}>
              Submit
              </Button>
            </div>
      </Card>
    </>
  );
};

export default Final;
