// Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-white mt-auto"
      style={{ backgroundColor: "#45526e" }}
    >
      <div className="container p-4 pb-0">
        <section>
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                BREVEMOD.
              </h6>
              <p>
                Whether you want to learn or to share what you know, you’ve come
                to the right place. As a global destination for online learning,
                we connect people through knowledge.
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <p>
                <small className="text-white">Brevemod Business</small>
              </p>
              <p>
                <small className="text-white">Teach on Brevemod</small>
              </p>

              <p>
                <small className="text-white">Get the app</small>
              </p>

              <p>
                <small className="text-white">About us</small>
              </p>

              <p>
                <small className="text-white">Contact us</small>
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <p>
                <small className="text-white">Careers</small>
              </p>
              <p>
                <small className="text-white">Blog</small>
              </p>

              <p>
                <small className="text-white">Help and Support</small>
              </p>

              <p>
                <small className="text-white">Affiliate</small>
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <p>
                <small className="text-white">Terms</small>
              </p>
              <p>
                <small className="text-white">Privacy Policy</small>
              </p>

              <p>
                <small className="text-white">Sitemap</small>
              </p>
            </div>
          </div>
        </section>

        <hr className="my-3"></hr>

        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <p className="mb-0">
                © {new Date().getFullYear()} Copyright : Application Developed
                By Saalim Shadman
              </p>
            </div>

            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/udemy/"
                className="text-white btn btn-outline-dark btn-floating me-1"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/udemy?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                className="text-white btn btn-outline-dark btn-floating m-1"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.udemy.com/"
                className="text-white btn btn-outline-dark btn-floating m-1"
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/udemy/"
                className="text-white btn btn-outline-dark btn-floating m-1"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
