import React from "react";
import { Card,Button } from "react-bootstrap";
import axios from "axios";


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
    farmAddress,
    city,
    country,
    zipcode,
    plotType,
    typeDetail,
    landOwner,
    landAddress,
    landCity,
    landCountry,
    landZipcode,
    totalArea,
    certificateDate,
    certificateLink,
    certificate,
    driverName,
    licenseId} = values;

    const saveFarmerDetails = async (props) => {
      // 👇️ navigate to /contacts
      // navigate.push('/');
      // const result = await axios.post('/api/farmers/farmerDetails',values)
    console.log(values)

    axios.put('/api/users/updateUserRoleAndRegistrationStatus', { email: JSON.parse(localStorage.getItem("currentUser")).email });
     const result = await axios.post('/api/farmers/farmerDetails',values).then((res)=>{
        console.log("asasda",res);
        window.location.href='/'
     })
    };
    //  console.log(result)
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
        <Card.Title>Review Registration Information</Card.Title>

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
            <strong>FarmAddress :</strong> {farmAddress}{" "}
          </p>
          <p>
            <strong>City :</strong> {city}{" "}
          </p>
          <p>
            <strong>Country :</strong> {country}{" "}
          </p>
          <p>
            <strong>Zipcode :</strong> {zipcode}{" "}
          </p>
          <p>
            <strong>Plot Type :</strong> {plotType}{" "}
          </p>
          <p>
            <strong>TypeDetail :</strong> {typeDetail}{" "}
          </p>
          <p>
            <strong>Land Owner :</strong> {landOwner}{" "}
          </p>
          <p>
            <strong>Land Address :</strong> {landAddress}{" "}
          </p>
          <p>
            <strong>Land City :</strong> {landCity}{" "}
          </p>
          <p>
            <strong>Land Country :</strong> {landCountry}{" "}
          </p>
          <p>
            <strong>Land Zip Code :</strong> {landZipcode}{" "}
          </p>
          <p>
            <strong>Total Area :</strong> {totalArea}{" "}
          </p>
          <p>
            <strong>Certificate Date :</strong> {certificateDate}{" "}
          </p>
          <p>
            <strong>Certificate Link :</strong> {certificateLink}{" "}
          </p>
          <p>
            <strong>Driver Name :</strong> {driverName}{" "}
          </p>
          <p>
            <strong>License Id :</strong> {licenseId}{" "}
          </p>
        </Card.Body>
        <div style={{ display: "flex", justifyContent: "space-around" }}>

              <Button variant="primary" type="submit" onClick={()=>saveFarmerDetails(props)}>
              Submit
              </Button>
            </div>
      </Card>
    </>
  );
};

export default Final;
