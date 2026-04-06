import React from "react";

const programPoints = [
  "Career clarity and direction",
  "Emotional steadiness and awareness",
  "Inner stability and focus",
  "Alignment for entrepreneurs and professionals",
];

const workshopPoints = [
  "Spaces for shared exploration and reflection",
  "Programs for institutions and organizations",
];

const OfferingsSection = () => {
  return (
    <section id="offerings" className="offerings-section">
      <div className="section-shell">
        <div className="section-heading align-left">
          <p className="section-kicker">Section 4</p>
          <h2 className="section-title">Offerings</h2>
        </div>

        <div className="offerings-grid">
          <article className="offering-card">
            <h3 className="block-title">1:1 Deep Work Sessions</h3>
            <p>
              A focused space for those looking to bring deeper alignment to how
              they think, feel, and act.
            </p>
          </article>

          <article className="offering-card">
            <h3 className="block-title">Structured Programs</h3>
            <ul className="bullet-list">
              {programPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="offering-card">
            <h3 className="block-title">Group and Workshops</h3>
            <ul className="bullet-list">
              {workshopPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
