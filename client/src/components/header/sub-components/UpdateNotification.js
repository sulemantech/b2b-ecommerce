import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Editdata = ({ filteredData }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [values, setValues] = useState({
      notification_type_id: filteredData?.notification_type_id || "",
      related_entity_type: filteredData?.related_entity_type || "",
      related_entity_id: filteredData?.related_entity_id || "",
      message: filteredData?.message || "",
      sender_id: filteredData?.sender_id || "",
      recipient_id: filteredData?.recipient_id || "",
      status: filteredData?.status || "",
      is_read: filteredData?.is_read || "",
    });
  
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PUBLIC_URL}/notifications/update/${filteredData.id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("Successfully worked", result);
  
        // Reset form values
        setValues({
          notification_type_id: "",
          related_entity_type: "",
          related_entity_id: "",
          message: "",
          sender_id: "",
          recipient_id: "",
          status: "",
          is_read: "",
        });
  
        handleClose(); // Close the modal after updating
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>
              Update Notification
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdate} style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, notification_type_id: e.target.value })
                    }
                    placeholder="Notification Type ID"
                    value={values.notification_type_id}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, related_entity_type: e.target.value })
                    }
                    placeholder="Related Entity Type"
                    value={values.related_entity_type}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, related_entity_id: e.target.value })
                    }
                    placeholder="Related Entity ID"
                    value={values.related_entity_id}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, message: e.target.value })
                    }
                    placeholder="Message"
                    value={values.message}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, sender_id: e.target.value })
                    }
                    placeholder="Sender ID"
                    value={values.sender_id}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, recipient_id: e.target.value })
                    }
                    placeholder="Recipient ID"
                    value={values.recipient_id}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, status: e.target.value })
                    }
                    placeholder="Status"
                    value={values.status}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setValues({ ...values, is_read: e.target.value })
                    }
                    placeholder="Is Read"
                    value={values.is_read}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default Editdata;
  