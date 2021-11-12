import React from 'react';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux'
import Kontainer from './components/container';

const App : React.FC = () => {
  return (
	<Provider store={store}>
		<Kontainer />
	</Provider>
  );
}

export default App;
