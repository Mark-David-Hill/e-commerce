import Category from "../components/Category";
import hero from "../assets/hero.jpg";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-wrapper">
        <img src={hero} alt="Hero" />
        <Category categoryName={"women's clothing"} />
        <Category categoryName={"men's clothing"} />
        <Category categoryName={"jewelry"} />
        <Category categoryName={"electronics"} />
      </div>
    </div>
  );
}
