import Category from "../Category";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Akamarak Shopping</h1>
      </div>
      <div className="categories-wrapper">
        <Category categoryName={"men's clothing"} />
        <Category categoryName={"jewelery"} />
        <Category categoryName={"electronics"} />
        <Category categoryName={"women's clothing"} />
      </div>
    </div>
  );
}
