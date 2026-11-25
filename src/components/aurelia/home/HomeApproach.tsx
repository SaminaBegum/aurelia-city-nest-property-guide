
import { homeContent } from "@/content/site";

export function HomeApproach() {
  return (
    <section
      className="home-approach section-wrap"
      id="about"
      aria-labelledby="approach-title"
    >
      <div className="home-approach__heading">
        <p className="eyebrow">
          {homeContent.approach.eyebrow}
        </p>

        <h2 id="approach-title">
          {homeContent.approach.title}
        </h2>
      </div>

      <div className="home-approach__principles">
        {homeContent.strengths.map((strength) => (
          <article
            className="approach-principle"
            key={strength.number}
          >
            <span className="approach-principle__number">
              {strength.number}
            </span>

            <h3>{strength.title}</h3>

            <p>{strength.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
