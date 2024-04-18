import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Editdata = ({ filteredData, name }) => {
  const storedToken = useSelector((state) => state.auth.token);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const [values, setValues] = useState({
  //   notification_type_id: filteredData?.notification_type_id || "",
  //   related_entity_type: filteredData?.related_entity_type || "",
  //   related_entity_id: filteredData?.related_entity_id || "",
  //   message: filteredData?.message || "",
  //   sender_id: filteredData?.sender_id || "",
  //   recipient_id: filteredData?.recipient_id || "",
  //   status: filteredData?.status || "",
  //   is_read: filteredData?.is_read || "",
  // });

  const handleShow = async () => {
    setShow(true);
    try {
      const response = await fetch(
        `http://localhost:5001/notifications/update/${filteredData.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(values),
          body: JSON.stringify({is_read: true }), // Update only is_read
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Successfully updated is_read:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <span style={{ fontSize: "17px" }}>{name}</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Update Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <span>{values.notificationType.typeName}</span> */}
          <h1 className="m-auto">{filteredData.message}</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editdata;
