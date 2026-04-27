import React, { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getSectionDetail, sectionDetails } from "./sectionDetails";

const SectionDetailPage = () => {
  const { sectionId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sectionKeys = useMemo(() => {
    const keys = Object.keys(sectionDetails);
    const preferredOrder = [
      "home",
      "about",
      "individuals",
      "offerings",
      "outcomes",
      "testimonials",
      "philosophy",
      "contact",
    ];

    return [
      ...preferredOrder.filter((key) => keys.includes(key)),
      ...keys.filter((key) => !preferredOrder.includes(key)),
    ];
  }, []);

  const activeKey = searchParams.get("section") || sectionId || sectionKeys[0];
  const section = getSectionDetail(activeKey);

  if (!section) {
    return (
      <main className="section-detail-page">
        <div className="section-detail-page-shell">
          <p className="section-detail-page-kicker">Not Found</p>
          <h1 className="section-detail-page-title">Section unavailable</h1>
          <p className="section-detail-page-intro">
            This detail page does not exist yet.
          </p>
          <Link className="section-detail-page-link" to="/">
            Back to experience
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section-detail-page">
      <div className="section-detail-page-shell">
        <div className="section-detail-page-layout">
          <aside className="section-detail-page-nav" aria-label="Detail sections">
            <p className="section-detail-page-kicker">Sync Details</p>
            <nav className="section-detail-page-navlist">
              {sectionKeys.map((key) => {
                const item = sectionDetails[key];
                const isActive = key === activeKey;

                return (
                  <button
                    key={key}
                    type="button"
                    className={`section-detail-page-navitem ${isActive ? "active" : ""}`}
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      next.set("section", key);
                      setSearchParams(next, { replace: true });
                    }}
                  >
                    {item?.title || key}
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="section-detail-page-content">
            <h1 className="section-detail-page-title">{section.title}</h1>
            <p className="section-detail-page-intro">{section.intro}</p>

            <div className="section-detail-page-body">
              {section.body.map((block, index) => {
                if (block.type === "list") {
                  return (
                    <section
                      key={`${section.id}-list-${index}`}
                      className="section-detail-page-group"
                    >
                      <h2 className="section-detail-page-group-title">{block.title}</h2>
                      <ul className="section-detail-page-list">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  );
                }

                return (
                  <p
                    key={`${section.id}-paragraph-${index}`}
                    className="section-detail-page-paragraph"
                  >
                    {block.content}
                  </p>
                );
              })}
            </div>

            <Link className="section-detail-page-link section-detail-page-link-wide" to="/">
              Back to experience
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SectionDetailPage;
