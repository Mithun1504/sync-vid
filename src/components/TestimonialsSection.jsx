import React from "react";

const testimonials = [
  {
    role: "Students",
    quote:
      "Real testimonial to be added. This placeholder keeps section structure and spacing ready.",
  },
  {
    role: "Professionals",
    quote:
      "Real testimonial to be added. This placeholder keeps section structure and spacing ready.",
  },
  {
    role: "Founders",
    quote:
      "Real testimonial to be added. This placeholder keeps section structure and spacing ready.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-shell">
        <div className="section-heading align-right">
          <p className="section-kicker">Section 7</p>
          <h2 className="section-title">Testimonials</h2>
          <p className="section-intro">
            Add your real social proof here when ready.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.role} className="testimonial-card">
              <h3 className="block-title">{item.role}</h3>
              <p>{item.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
