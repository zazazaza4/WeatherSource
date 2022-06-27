import { useState } from 'react';

import useWeatherService from '../../services/useWeatherService';

import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/spinner';
import Search from '../Search/Search';
import Widget from '../widget/widget';

import './App.scss';

function App() {
	const [dataWeather, setDataWeather] = useState({});
	const [city, setCity] = useState();

	const { getDateCity, setProcess, process } = useWeatherService();

	const dataLoaded = (data) => {
		setDataWeather(data);
		setCity(data.city);
	}

	const searchCity = currentCity => {
		if (currentCity) {
			getDateCity(currentCity)
				.then(dataLoaded)
				.then(() => setProcess('confirmed'));
		}
	}

	const setContext = process => {
		switch (process) {
			case 'waiting':
				return <Widget/>
			case 'loading':
				return <Spinner/>
			case 'error':
				return <ErrorMessage/>
			case 'confirmed':
				return <Widget dataWeather={dataWeather}/>
			default:
				throw new Error(`Unexpected process state =>`);
		}
	}

	const context = setContext(process);
	return (
		<div className="wrapper rounded-3 mx-auto my-2 px-2 pt-4">
			<Search city={process === 'error' ? 'City isn`t chosen' : city} searchCity={searchCity} />
			{context}
		</div>
	);
}

export default App;