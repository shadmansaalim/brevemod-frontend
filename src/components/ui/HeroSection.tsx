// Imports
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="mb-5">
      <Row className="d-flex align-items-center">
        <Col md="7" lg="7" xl="5" className="mx-auto">
          <div>
            <h1>What Will You Discover?</h1>
            <p>
              Explore new skills, deepen existing passions, and get lost in
              creativity. What you find just might surprise and inspire you.
            </p>
            <Button
              onClick={() => router.push("/courses")}
              variant="success"
              size="lg"
            >
              Browse Courses
            </Button>
          </div>
        </Col>
        <Col md="5" lg="5" xl="4" className="mx-auto">
          <div>
            <img
              className="img-fluid mt-4 mt-md-0 pe-3 pe-md-0"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6JVJEaAT8FWwiBfVl1vECY/eccd28d76369194c1bae181bdef80140/hero-b.png?auto=format%2Ccompress&dpr=2&w=459&h=497&q=40"
              alt=""
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HeroSection;
