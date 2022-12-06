import React, { useState , useEffect } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function Drone({ drone, fromdate, todate }) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row m-3 p-3 bs">
      <div className="col-md-4">
        <img src={drone.imageurls[0]} className="img-fluid" />
      </div>
      <div className="col-md-8">
        <h1>{drone.name}</h1>
        
        
        <p>
          <b>Type : {drone.type}</b>
        </p>

        <div style={{ float: "right" }}>
          {(fromdate && todate) && (<Link to={`/book/${drone._id}/${fromdate}/${todate}`}>
            <button className="btn btn-dark m-2">Book Now</button>
          </Link>)}
          
          <button className="btn btn-danger m-2"  onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" data--aos='zoom-in'>
        <Modal.Header>
          <Modal.Title>{drone.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel nextLabel="" prevLabel="">
            {drone.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    src={url}
                    className="img-fluid"
                    style={{ height: "400px" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{drone.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Drone;
