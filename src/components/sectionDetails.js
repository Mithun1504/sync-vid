export const sectionDetails = {
  about: {
    id: "about",
    title:
      "Everything seems in place. Yet something feels slightly out of alignment.",
    intro:
      "This section expands on the subtle inner friction that often exists even when life looks functional from the outside.",
    body: [
      {
        type: "paragraph",
        content:
          "Many people do not arrive at this work because life is falling apart. They arrive because something feels quietly off. There may be progress, responsibility, and movement, but not the kind of steadiness that allows those things to feel truly integrated.",
      },
      {
        type: "paragraph",
        content:
          "The disconnect can show up as overthinking, low emotional clarity, repeated inner tension, or a vague sense that you are operating below your real depth. It is often subtle enough to be ignored, but persistent enough to shape daily life.",
      },
      {
        type: "list",
        title: "Common signals",
        items: [
          "A mind that does not fully settle even during quiet moments",
          "Direction that feels unclear despite effort and ambition",
          "Emotional fluctuation that affects presence and consistency",
          "Patterns that repeat even when you understand them intellectually",
          "A sense that more coherence is possible in how you live and respond",
        ],
      },
    ],
  },
  individuals: {
    id: "individuals",
    title: "A quieter way to bring things into alignment.",
    intro:
      "This approach is designed to connect inner work with grounded, real-world movement rather than separating reflection from action.",
    body: [
      {
        type: "paragraph",
        content:
          "The work is not only about insight. It looks at the patterns that shape thought, the identity shifts that make change sustainable, and the practical decisions that turn clarity into lived action.",
      },
      {
        type: "paragraph",
        content:
          "Instead of treating inner life and external execution as two separate tracks, the process helps them support one another. That is where change becomes steadier and more usable in ordinary life.",
      },
      {
        type: "list",
        title: "What the approach works across",
        items: [
          "Patterns of thought and behavior",
          "Awareness and deeper identity shifts",
          "Practical clarity in decisions and next steps",
        ],
      },
      {
        type: "list",
        title: "Why it lands deeply",
        items: [
          "Grounded in lived and real-world experience",
          "Integrates internal alignment with external execution",
          "Built for people moving through growth, transition, and responsibility",
        ],
      },
    ],
  },
  offerings: {
    id: "offerings",
    title: "Offerings",
    intro:
      "Support is offered in a few different formats so the depth of the work can match the context you are in.",
    body: [
      {
        type: "paragraph",
        content:
          "Some people need a focused one-to-one space. Others benefit from a structured progression or a shared group container. The format changes, but the intention remains the same: bringing thought, feeling, and action into stronger coherence.",
      },
      {
        type: "list",
        title: "1:1 deep work sessions",
        items: [
          "Focused space for personal alignment and self-understanding",
          "Useful for moments of transition, friction, or deeper inquiry",
        ],
      },
      {
        type: "list",
        title: "Structured programs",
        items: [
          "Career clarity and direction",
          "Emotional steadiness and awareness",
          "Inner stability and focus",
          "Alignment for entrepreneurs and professionals",
        ],
      },
      {
        type: "list",
        title: "Group and workshop formats",
        items: [
          "Spaces for shared exploration and reflection",
          "Programs for institutions and organizations",
        ],
      },
    ],
  },
  outcomes: {
    id: "outcomes",
    title: "What begins to shift",
    intro:
      "The outcomes are often felt both internally and externally. They are less about dramatic reinvention and more about steady, usable change.",
    body: [
      {
        type: "paragraph",
        content:
          "As inner friction reduces, people often notice that decisions become clearer, emotional reactions soften, and action takes less effort. There is more space between impulse and response, and more confidence in the direction being taken.",
      },
      {
        type: "paragraph",
        content:
          "These changes tend to show up quietly but meaningfully in work, relationships, routines, and self-trust. The shift is not just insight. It is a calmer way of functioning.",
      },
      {
        type: "list",
        title: "Practical changes you may notice",
        items: [
          "Greater clarity in decisions",
          "A steadier emotional state",
          "A clearer sense of direction",
          "Less internal friction",
          "More ease in taking action",
        ],
      },
    ],
  },
  testimonials: {
    id: "testimonials",
    title: "Testimonials",
    intro:
      "This space will hold fuller stories and social proof from the people and teams this work has supported.",
    body: [
      {
        type: "paragraph",
        content:
          "For now, this section is structured as a readiness layer rather than a placeholder. It is meant to support future testimonials from students, professionals, founders, and organizations without changing the interaction model of the page.",
      },
      {
        type: "paragraph",
        content:
          "When real testimonials are added, the modal can hold longer quotes, short case-study summaries, or role-based reflections that are easier to read than inside the hero overlay itself.",
      },
      {
        type: "list",
        title: "Suggested testimonial categories",
        items: [
          "Students speaking about clarity and inner steadiness",
          "Professionals describing better direction and emotional regulation",
          "Founders reflecting on leadership, decision-making, and alignment",
        ],
      },
    ],
  },
  philosophy: {
    id: "philosophy",
    title: "Philosophy",
    intro:
      "The core idea is simple: most people are not lacking information. What is missing is alignment.",
    body: [
      {
        type: "paragraph",
        content:
          "The gap is often not between knowing and not knowing. It is between what one understands, what one feels, and what one is actually able to embody through action.",
      },
      {
        type: "paragraph",
        content:
          "This work does not try to add more noise, urgency, or complexity. It aims to bring the inner landscape into enough coherence that life outside begins to feel more intentional, grounded, and true.",
      },
      {
        type: "list",
        title: "What guides the work",
        items: [
          "Less accumulation, more alignment",
          "Depth without performance",
          "Action that grows from inner steadiness instead of pressure",
        ],
      },
    ],
  },
};

export const getSectionDetail = (detailKey) => sectionDetails[detailKey] || null;
