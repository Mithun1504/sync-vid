import React from "react";

const approachPoints = [
  "Patterns of thought and behavior",
  "Awareness and deeper identity shifts",
  "Practical clarity in decisions and action",
];

const credibilityPoints = [
  "Grounded in real-world experience",
  "Integrates inner work with external execution",
  "Shaped through work with individuals across different stages",
];

const ApproachSection = () => {
  return (
    <section id="approach" className="approach-section">
      <div className="section-shell">
        <div className="section-heading align-right">
          <p className="section-kicker">Section 3</p>
          <h2 className="section-title">
            A quieter way to bring things into alignment.
          </h2>
          <p className="section-intro">
            An integrated approach that works across:
          </p>
        </div>

        <div className="approach-grid">
          {approachPoints.map((point) => (
            <article key={point} className="content-card">
              <p>{point}</p>
            </article>
          ))}
        </div>

        <div className="credibility-block">
          <h3 className="block-title">Why this works</h3>
          <ul className="bullet-list">
            {credibilityPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
