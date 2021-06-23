import React from 'react';
import './App.css';
import NavBar from './components/navBar';
import Routes from './routes';

function App() {
  return (
    <section>
      <NavBar />
      <section>{Routes}</section>
    </section>
  );
}

export default App;
