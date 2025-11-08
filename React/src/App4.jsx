import React from "react";
import StatusMessage from "./Day/StatusMessage.jsx";
import MultiStepForm from "./Day/MultiStepForm.jsx";
import PageRouter from "./Day/DashboardPage .jsx";

const App4 = () => {
  const [status, setStatus] = React.useState("idle");
  const [step, setStep] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState("dashboard");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Demo: Lookup Object Pattern</h2>
      <StatusMessage status={status} />
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setStatus("loading")}>Loading</button>
        <button onClick={() => setStatus("success")}>Success</button>
        <button onClick={() => setStatus("error")}>Error</button>
        <button onClick={() => setStatus("idle")}>Idle</button>
        <button onClick={() => setStatus("unknown")}>Unknown</button>
      </div>

      <br />

      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h2>Demo: Biến JSX với If/Else</h2>
        <p>Bước hiện tại: {step}/3</p>

        <MultiStepForm
          step={step}
          onNext={() => setStep((s) => Math.min(s + 1, 3))}
          onPrev={() => setStep((s) => Math.max(s - 1, 1))}
          onSubmit={() => alert("Form đã được gửi!")}
        />
      </div>

      <br />

      <div style={{ fontFamily: "Arial" }}>
        <nav
          style={{
            background: "#333",
            padding: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setCurrentPage("dashboard")}
            style={{ padding: "8px 16px" }}
          >
            Dashboard1x
          </button>
          <button
            onClick={() => setCurrentPage("profile")}
            style={{ padding: "8px 16px" }}
          >
            Profile
          </button>
          <button
            onClick={() => setCurrentPage("settings")}
            style={{ padding: "8px 16px" }}
          >
            Settings
          </button>
          <button
            onClick={() => setCurrentPage("unknown")}
            style={{ padding: "8px 16px" }}
          >
            Unknown
          </button>
        </nav>

        <PageRouter page={currentPage} />
      </div>
    </div>
  );
};

export default App4;
