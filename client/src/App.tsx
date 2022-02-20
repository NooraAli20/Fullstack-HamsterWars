import React from 'react';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux'
import Kontainer from './components/container';
import { ConfirmProvider } from 'material-ui-confirm';
//import axios from 'axios';

const App : React.FC = () => {

	//axios.defaults.baseURL = "http://hamster-krig.herokuapp.com"
  	return (
		<Provider store={store}>
			<ConfirmProvider>
				<Kontainer />
			</ConfirmProvider>
		</Provider>
  	);
}

export default App;
