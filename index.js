import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store'; // Ensure this is the correct path to your Redux store file

// Wrap the App component with the Redux Provider to provide the store to the app
const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the root component
registerRootComponent(RootComponent);
