import React from "react";

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="philosophy-section">
      <div className="section-shell">
        <div className="section-heading align-left">
          <p className="section-kicker">Section 6</p>
          <h2 className="section-title">Philosophy</h2>
        </div>

        <article className="philosophy-panel">
          <p className="philosophy-line">
            Most people are not lacking information. There is simply a gap
            between how they think, feel, and act.
          </p>
          <p className="philosophy-line">
            The work is not about adding more. It is about bringing these layers
            into quiet alignment.
          </p>
        </article>
      </div>
    </section>
  );
};

export default PhilosophySection;
