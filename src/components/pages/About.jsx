export default function About() {
  return (
    <div className="about-container">
      <h1>About</h1>
      <p>
        This e-commerce site was made as part of my apprenticeship at
        DevPipeline. For our React Capstone we were asked to create an
        e-commerce site with a variety of features.
      </p>
      <p>
        It was an interesting challenge! While I had worked on projects in React
        before, this was the first time I needed to build a React App of this
        scope. While I wasn't quite sure how to start at the beginning, it
        helped to break down what pages, components, and functionality would be
        needed. My plans weren't perfect and some things needed to be refactored
        along the way, but it was still helpeful for getting a general idea of
        where I was going and what steps I could begin to take.
      </p>
      <p>
        One example of a challenge from this project was that as I was building
        out the cart functionality It became difficult to work with the products
        data that had been fetched, as it was being passed around and used in
        several places. The problem was solved by adding the array of fetched
        product data to context so it could be more easily used in conjunction
        with the cart and on other pages.
      </p>
      <h2>Instructions</h2>
      <p>Explain the process of your capstone</p>
      <p>
        Explain struggles you experienced throughout the frontend course and how
        you solved them
      </p>
      <p>Explain your favorite lanugages and why</p>
    </div>
  );
}
