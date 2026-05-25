import React, { useState } from "react";
import axios from "axios";

function App() {

  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleCode = `password = "12345"
print(password)`;

  const analyzeCode = async () => {

    if (!code.trim()) {
      alert("Please enter code");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/review",
        { code }
      );

      setReview(response.data.ai_review);

    } catch (error) {

      console.log(error);

      alert("Backend connection error");

    }

    setLoading(false);
  };

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <h1 style={styles.title}>
          AI Code Review Assistant
        </h1>

        <p style={styles.subtitle}>
          Smart AI-powered pull request and vulnerability analyzer
        </p>

      </div>

      <div style={styles.statsRow}>

        <div style={styles.statCardRed}>
          <h2>🔴 High Risk</h2>
          <p>Hardcoded Secrets</p>
        </div>

        <div style={styles.statCardYellow}>
          <h2>🟡 Medium</h2>
          <p>Code Smells</p>
        </div>

        <div style={styles.statCardGreen}>
          <h2>🟢 Safe</h2>
          <p>Best Practices</p>
        </div>

      </div>

      <div style={styles.mainGrid}>

        <div style={styles.leftPanel}>

          <div style={styles.panelHeader}>
            <h2>Paste Your Code</h2>

            <button
              style={styles.sampleButton}
              onClick={() => setCode(sampleCode)}
            >
              Load Sample
            </button>
          </div>

          <textarea
            style={styles.textarea}
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            style={styles.analyzeButton}
            onClick={analyzeCode}
          >
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>

        </div>

        <div style={styles.rightPanel}>

          <h2>AI Review Results</h2>

          <div style={styles.reviewBox}>

            {loading ? (

              <div style={styles.loaderContainer}>
                <div style={styles.loader}></div>
                <p>AI analyzing vulnerabilities...</p>
              </div>

            ) : review ? (

              <pre style={styles.reviewText}>
                {review}
              </pre>

            ) : (

              <p style={styles.placeholder}>
                AI review results will appear here...
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #020617, #0f172a)",
    color: "white",
    padding: "30px",
    fontFamily: "Arial"
  },

  header: {
    textAlign: "center",
    marginBottom: "40px"
  },

  title: {
    fontSize: "48px",
    color: "#3b82f6",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "18px"
  },

  statsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },

  statCardRed: {
    flex: 1,
    backgroundColor: "#7f1d1d",
    padding: "20px",
    borderRadius: "15px"
  },

  statCardYellow: {
    flex: 1,
    backgroundColor: "#78350f",
    padding: "20px",
    borderRadius: "15px"
  },

  statCardGreen: {
    flex: 1,
    backgroundColor: "#14532d",
    padding: "20px",
    borderRadius: "15px"
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px"
  },

  leftPanel: {
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "20px"
  },

  rightPanel: {
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "20px"
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  sampleButton: {
    backgroundColor: "#334155",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  textarea: {
    width: "100%",
    height: "400px",
    marginTop: "20px",
    backgroundColor: "#020617",
    color: "white",
    border: "1px solid #334155",
    borderRadius: "15px",
    padding: "20px",
    fontSize: "15px",
    outline: "none"
  },

  analyzeButton: {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  reviewBox: {
    marginTop: "20px",
    minHeight: "450px",
    backgroundColor: "#020617",
    borderRadius: "15px",
    padding: "20px",
    border: "1px solid #334155"
  },

  reviewText: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.8",
    fontSize: "15px"
  },

  placeholder: {
    color: "#94a3b8"
  },

  loaderContainer: {
    textAlign: "center",
    marginTop: "100px"
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid #334155",
    borderTop: "5px solid #3b82f6",
    borderRadius: "50%",
    margin: "0 auto 20px auto",
    animation: "spin 1s linear infinite"
  }
};

export default App;