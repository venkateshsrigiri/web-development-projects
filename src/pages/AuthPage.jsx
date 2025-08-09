import { Container, Row, Col } from "react-bootstrap";
import AuthForm from "../Components/AuthForm";
import "./AuthPage.css";

export default function AuthPage() {
  return (
    <Container fluid className="auth-page d-flex align-items-center min-vh-100">
      <Row className="w-100">
        {/* Left side: illustration */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center bg-light"
        >
          <img
            src="https://undraw.co/api/illustrations/random"
            alt="Auth illustration"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </Col>

        {/* Right side: form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <AuthForm />
        </Col>
      </Row>
    </Container>
  );
}
