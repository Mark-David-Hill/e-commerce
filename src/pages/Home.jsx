import Category from "../components/Category";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-wrapper">
        <Category categoryName={"women's clothing"} />
        <Category categoryName={"men's clothing"} />
        <Category categoryName={"jewelry"} />
        <Category categoryName={"electronics"} />
      </div>
    </div>
  );
}
