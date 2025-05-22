import React, { useState } from "react";
import axios from "axios";

function BackendAPIs() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState("");
  const [localStatus, setLocalStatus] = useState("");

  const validateEmail = async () => {
    if (!email) {
      setStatus("❗ Please enter an email.");
      return;
    }

    setStatus("Loading...");
    try {
      const response = await axios.post("http://localhost:5000/validate-email", { email });
      setStatus(response.data.status);
    } catch (error) {
      setStatus("❌ Failed to validate email.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setFileStatus("❗ Please select a file.");
      return;
    }

    setFileStatus("Processing file...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/validate-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "validated_emails.xlsx");
      document.body.appendChild(link);
      link.click();

      setFileStatus("✅ File processed and downloaded.");
    } catch (error) {
      setFileStatus("❌ Failed to process file.");
    }
  };

  const validateLocalFile = async () => {
    setLocalStatus("Processing local file...");
    try {
      const response = await axios.get("http://localhost:5000/validate-local-excel", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "emails_validated.xlsx");
      document.body.appendChild(link);
      link.click();

      setLocalStatus("✅ Local file processed and downloaded.");
    } catch (error) {
      setLocalStatus("❌ Failed to process local file.");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Email Deliverability Validator</h2>

      {/* Single Email Validator */}
      <input
        type="email"
        value={email}
        placeholder="Enter email address"
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={validateEmail} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Validate
      </button>
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        {status && <p>Status: {status}</p>}
      </div>

      <hr style={{ margin: "40px 0" }} />

      {/* Excel Upload */}
      <h3>Upload Excel File (.xlsx)</h3>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleFileUpload} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        Upload & Validate
      </button>
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        {fileStatus && <p>{fileStatus}</p>}
      </div>

      <hr style={{ margin: "40px 0" }} />

      {/* Local Excel Validation */}
      <h3>Run Validation on Local Backend File</h3>
      <button onClick={validateLocalFile} style={{ padding: "10px 20px" }}>
        Validate `emails.xlsx`
      </button>
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        {localStatus && <p>{localStatus}</p>}
      </div>
    </div>
  );
}

export default BackendAPIs;