import "animate.css";

import "./styles.css";

import TrackVisibility from "react-on-screen";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import headerImg from "../../assets/img/header-img.svg";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  /**
   * If the text is deleting, then set the text to the full text minus the last character. If the text
   * is not deleting, then set the text to the full text plus the next character. If the text is not
   * deleting and the text is equal to the full text, then set the text to deleting and set the delta to
   * the period. If the text is not deleting and the text is equal to an empty string, then set the text
   * to not deleting, set the loop number to the next loop number, and set the delta to 500.
   */
  const tick = () => {
    /* Getting the index of the array. the loopNum is always increasing so it needs to go back to the size of the ar */
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    /* Checking if the text is deleting, if it is, then it will substract the last character, if it is not,
then it will add the next character. */
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    {`Hi I'm Rossano `}
                    <span className="wrap">{text}</span>
                  </h1>
                  <p>`Lorem Ipsum aqui vai a bio`</p>
                  <button onClick={() => console.log("connect")}>
                    Let’s Connect <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImg} alt="header img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
