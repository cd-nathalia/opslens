function FindingGroup({ title, items }) {
  return (
    <section className="report-group">
      <h3>{title}</h3>

      <div className="findings">
        {items.map((item, index) => (
          <div
            className="finding"
            key={`${title}-${item.title}-${index}`}
          >
            <span className={`severity ${item.severity.toLowerCase()}`}>
              {item.severity}
            </span>

            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReportPanel({ report }) {
  const generatedTime = new Date(report.generatedAt).toLocaleString();

  return (
    <section className="report">
      <header>
        <div>
          <span className="eyebrow">
            <span /> REPORT GENERATED
          </span>

          <h2>Stack assessment</h2>
        </div>

        <span className="report-time">{generatedTime}</span>
      </header>

      <div className="score-row">
        <div className="score-copy">
          <b>{report.infrastructureOverview.summary}</b>

          <p>
            Detected components:{' '}
            {report.infrastructureOverview.detectedComponents.join(', ')}
          </p>
        </div>
      </div>

      <FindingGroup
        title="Security findings"
        items={report.securityFindings}
      />

      <FindingGroup
        title="Operational risks"
        items={report.operationalRisks}
      />

      <FindingGroup
        title="Suggested next steps"
        items={report.suggestedNextSteps}
      />
    </section>
  );
}

export default ReportPanel;
