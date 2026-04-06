import React from "react";

const outcomes = [
  "Greater clarity in decisions",
  "A steadier emotional state",
  "A clearer sense of direction",
  "Less internal friction",
  "More ease in taking action",
];

const OutcomesSection = () => {
  return (
    <section id="outcomes" className="outcomes-section">
      <div className="section-shell">
        <div className="section-heading align-right">
          <p className="section-kicker">Section 5</p>
          <h2 className="section-title">What begins to shift</h2>
        </div>

        <div className="outcomes-grid">
          {outcomes.map((item) => (
            <article key={item} className="soft-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
