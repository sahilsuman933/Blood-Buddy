import Navbar from "../Navbar";
import "./wrapper.css";

const Wrapper = (props) => {
  return (
    <div className="container">
      <Navbar />
      <div className="content-wrapper">{props.children}</div>
    </div>
  );
};

export default Wrapper;
