import React, { useEffect, useState } from 'react';
import Home from './components/Home';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <main>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <Home />
    </main>
  );
}

export default App;
