import React from "react";

const problemPoints = [
  "A mind that doesn't quite settle",
  "Direction that feels unclear at times",
  "Emotions that fluctuate more than you'd like",
  "Patterns that quietly repeat",
  "A sense you could be operating at a deeper level",
];

const ProblemSection = () => {
  return (
    <section id="problem" className="problem-section">
      <div className="problem-inner">
        <div className="section-heading align-left">
          <p className="section-kicker">Section 2</p>
          <h2 className="problem-title">
            Everything seems in place. Yet something feels slightly out of
            alignment.
          </h2>
        </div>
        <ul className="problem-list">
          {problemPoints.map((point) => (
            <li key={point} className="problem-item">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProblemSection;
