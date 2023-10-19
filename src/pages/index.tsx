//Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Row, Col, Accordion, Container } from "react-bootstrap";
import HeroSection from "@/components/HeroSection";
import { useEffect, useState } from "react";
import { ICourse } from "@/interfaces/common";
import Course from "@/components/Course";

const HomePage: NextPageWithLayout = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_SERVER_URL}/courses?limit=${4}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <section className="my-5">
        <HeroSection />
        <div className="mx-auto" style={{ marginTop: 120, marginBottom: 120 }}>
          <div>
            <h1 className="mb-5 text-start">Explore Top Courses</h1>
            <Row xs={1} md={2} lg={4} className="g-4">
              {courses.map((course) => (
                <Course key={course._id} course={course}></Course>
              ))}
            </Row>
          </div>
        </div>
        <div className="mx-auto" style={{ marginTop: 120, marginBottom: 120 }}>
          <h1 className="headline mb-3 text-start">FAQ</h1>
          <Row className="d-flex justfiy-content-around align-items-center">
            <Col lg={6} className="mx-auto">
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Resources</Accordion.Header>
                  <Accordion.Body>
                    Whenever you learn, you want to have access to as many
                    resources as possible, and Brevemod ensures that. Students
                    can complete exercises and assignments and submit them to
                    instructors to get their opinion on how they have performed
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Low Prices</Accordion.Header>
                  <Accordion.Body>
                    Low prices (typically $10-$15) offer equal access to
                    education
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Lifetime Access</Accordion.Header>
                  <Accordion.Body>
                    Lifetime access to course content (the $10-$15 fee is
                    one-off, and students are not billed every month)
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Top Instructors</Accordion.Header>
                  <Accordion.Body>
                    There is a great number of instructors who compete to create
                    quality content (otherwise the marketplace’s rating system
                    would penalize them, and they would not succeed)
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Trendy Topics</Accordion.Header>
                  <Accordion.Body>
                    Competition creates a very dynamic environment in course
                    creation, and trendy topics are covered on Brevemod much
                    faster compared to other platforms.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col lg={5} className="mx-auto">
              <img
                className="img-fluid"
                src="https://s.udemycdn.com/home/non-student-cta/instructor-2x-v3.jpg"
                alt=""
              />
            </Col>
          </Row>
        </div>
      </section>
    </Container>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
