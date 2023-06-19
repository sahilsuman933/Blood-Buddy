import Wrapper from "../Wrapper/Wrapper";
import "./container.css";

const Container = (props) => {
  return (
    <Wrapper>
      <div className="form-container">{props.children}</div>
    </Wrapper>
  );
};

export default Container;
