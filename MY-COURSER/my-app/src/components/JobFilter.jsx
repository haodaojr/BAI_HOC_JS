function JobFilter({ jobs, selectedJob, setSelectedJob }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      {jobs.map((job) => (
        <button
          key={job}
          onClick={() => setSelectedJob(job)}
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            backgroundColor: selectedJob === job ? "#2196F3" : "#e0e0e0",
            color: selectedJob === job ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {job === "all" ? "Tất cả" : job}
        </button>
      ))}
    </div>
  );
}

export default JobFilter;
