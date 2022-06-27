import { useState } from 'react';
import useWeatherService from '../../services/useWeatherService';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const Search = ({city = 'City isn`t chosen', searchCity}) => {
	const [currentCity, setCurrentCity] = useState('');
	const {setProcess} = useWeatherService();

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			onUpdateCity();
		}
	}

	const onUpdateCity = () => {
		searchCity(currentCity);
		setCurrentCity('');
		setProcess("loading");
	}

	return (
		<header className="mt-1">
			<InputGroup className="mb-3">
				<InputGroup.Text className='text-light bg-dark fs-6'>
						{city}
				</InputGroup.Text>
				<FormControl
					placeholder='search ...'
					onKeyDown={handleKeyDown}
					value={currentCity}
					onChange={event => setCurrentCity(event.target.value)}
					className='fs-6' 
					aria-label="City" />
				<Button 
					onClick={onUpdateCity}
					variant="dark" 
					id="button-addon2">
						Search
				</Button>
			</InputGroup>
		</header>
	)
}

export default Search;