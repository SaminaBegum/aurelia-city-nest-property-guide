
import { homeContent, markets } from "@/content/site";
import { useMarket } from "@/hooks/use-market";

export function HomeStory() {
  const { market } = useMarket();

  const currentMarket = markets[market];

  return (
    <section
      className="home-story"
      aria-labelledby="story-title"
    >
      <div className="home-story__image">
        <img
          src={currentMarket.image}
          alt={currentMarket.imageAlt}
          loading="lazy"
        />
      </div>

      <div className="home-story__copy">
        <p className="eyebrow">
          {homeContent.story.eyebrow}
        </p>

        <h2 id="story-title">
          {homeContent.story.title}
        </h2>

        <p>{homeContent.story.body}</p>
      </div>
    </section>
  );
}
