import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Category from './kfc/Category';
import Order from './kfc/Order';
import Home from './day01/First';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route path="/Category" component={Category} />
				<Route path="/Order" component={Order} />

			</BrowserRouter>
		</div>
	);
}

export default App;
