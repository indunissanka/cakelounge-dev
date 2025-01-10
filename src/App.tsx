import React from 'react';
    import CakeCustomizer from './components/CakeCustomizer';
    import { Contact } from './components/Contact';

    function App() {
      return (
        <>
          <div className="bg-pink-100 text-center py-2 text-gray-700 font-bold text-xl">
            The Cake Lounge
          </div>
          <CakeCustomizer />
          <Contact />
          <footer className="bg-gray-800 text-white text-center py-4">
            <p className="text-sm">
              Page Developer Details - Mark Nissanka
            </p>
          </footer>
        </>
      );
    }

    export default App;
