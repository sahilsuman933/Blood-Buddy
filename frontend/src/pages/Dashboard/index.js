import Wrapper from "../../components/Wrapper/Wrapper";

const Dashboard = () => {
  return (
    <Wrapper>
      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          maxWidth: "1200px",
        }}
      >
        <h1 style={{ fontWeight: "900", fontSize: "36px", lineHeight: "40px" }}>
          Blood Transportation <br />
          System
        </h1>
        <h3 style={{ fontWeight: "500", fontSize: "18px", lineHeight: "30px" }}>
          Real-time Monitoring and Reporting of Blood Requests and Inventory
        </h3>
        <p
          style={{
            fontWeight: "400",
            fontSize: "18px",
            maxWidth: "75%",
            textAlign: "justify",
            lineHeight: "30px",
          }}
        >
          The Blood Transfusion Management Dashboard allows hospitals to easily
          track and monitor blood requests and inventory levels in real-time.
          With a user-friendly interface and powerful features, hospitals can
          view detailed information about blood supply chain, receive
          notifications about any issues, and make informed decisions. The
          dashboard includes data visualizations and an emergency notification
          system to quickly resolve any problems during the transfusion process.
          It streamlines blood management processes and ensures safe and timely
          delivery of blood to patients in need.
        </p>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
