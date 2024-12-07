import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './App.css'
const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);

  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={() => setActive((i) => i - 1)}>
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child : any, i : any) => {
        const style: React.CSSProperties = {
          '--active': i === active ? 1 : 0,
          '--offset': (active - i) / 3,
          '--direction': Math.sign(active - i),
          '--abs-offset': Math.abs(active - i) / 3,
          pointerEvents: active === i ? 'auto' : 'none',
          opacity: Math.abs(active - i) >= MAX_VISIBILITY ? 0 : 1,
          display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
        } as React.CSSProperties;

        return (
          <div className="card-container" style={style}>
            {child}
          </div>
        );
      })}
      {active < count - 1 && (
        <button className="nav right" onClick={() => setActive((i) => i + 1)}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <div className="app">
    <Carousel>
      {[...new Array(CARDS)].map((_, i) => (
        <Card
          key={i}
          title={'Card ' + (i + 1)}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      ))}
    </Carousel>
  </div>
);

export default App;
// Ensure there's a root element in your HTML with id "root"
ReactDOM.render(<App />, document.getElementById('root'));