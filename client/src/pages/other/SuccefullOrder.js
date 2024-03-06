import Card from "react-bootstrap/Card";
import LayoutOne from "../../layouts/LayoutOne";


function OrderSuccess() {
  return (
    
      <LayoutOne headerTop="visible">
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
    <Card className="col-md-6 mx-auto">
      <Card.Body className="" >
        <Card.Title className="text-center">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-check"
            width="92"
            height="92"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="#00b341"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
        </Card.Title>
        <Card.Subtitle style={{fontSize:"100%"}} className="mb-2 text-muted text-center">Your Order Is Confirmed</Card.Subtitle>
        <Card.Text className="text-center">
        Thank you for your order! We've received your request and will process it shortly
        </Card.Text>
        {/* <Card.Link href="/shop-grid-standard" className="text-white bg-black p-1 rounded rounded-border border border-primary">
            Back to Home
            </Card.Link> */}
      
      </Card.Body>
    </Card>
    </div>
    </LayoutOne>
    
  );
}

export default OrderSuccess;
