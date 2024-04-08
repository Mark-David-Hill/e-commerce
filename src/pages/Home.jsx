import Category from "../components/Category";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-wrapper">
        <Category categoryName={"men's clothing"} />
        <Category categoryName={"jewelery"} />
        <Category categoryName={"electronics"} />
        <Category categoryName={"women's clothing"} />
      </div>
    </div>
  );
}
