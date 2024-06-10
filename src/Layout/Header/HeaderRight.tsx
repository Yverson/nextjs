import { Col } from "reactstrap";
import { Profile } from "./Profile";

export const HeaderRight = () => {
  return (
    <Col xxl="8" xl="6" md="7" xs="8" className="nav-right pull-right right-header p-0 ms-auto">
      <ul className="nav-menus">
        <Profile/>
      </ul>
    </Col>
  );
};
