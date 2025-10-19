import "../assets/skeleton.css";

export const HeroSkeleton = () => {
  return (
    <section className="hero skeleton --sqaure">
      <i className="-title _skeleton --rounded"></i>
      <i className="-desc _skeleton --rounded"></i>
      <div className="-heroBtns">
        <i className="-btn _skeleton --sqaure"></i>
        <i className="-btn _skeleton --sqaure"></i>
      </div>
    </section>
  );
};

export const CarouselSkeleton = () => {
  return (
    <ul className="carousel skeleton --square">
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
      <li className="-item _skeleton --rounded"></li>
    </ul>
  );
};
