import React from 'react';

import WagesModal from 'components/wages-modal';
import AppHeader from './app-header';
import AppContent from './app-content';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="app__wrapper">
          <AppHeader />
          <AppContent />
          <WagesModal />
        </div>
      </div>
    );
  }
}

export default App;
