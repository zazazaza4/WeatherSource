import { useHttp } from '../hooks/http.hook'

const useWeatherService = () => {
    const apiKey = `27b1e981723574e584d3c9c1ccce3932`;
    const apiBase = `https://api.openweathermap.org/data/2.5/`;
    const apiIcon = 'http://openweathermap.org/img/wn/';

    const { setProcess, process, request, clearError } = useHttp();

    const getDateCity = async(city = '') => {
        const response = await request(`${apiBase}weather?q=${city}&appid=${apiKey}`);
        return await _transformData(response);
    }

    const _transformDate = date => {
        const plusZero = item => item < 10 ? `0${item}` : item;
        const day = plusZero(date.getDate());
        const month = plusZero(date.getMonth());
        const year = plusZero(date.getFullYear());
        const week = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

        return `${day}/${month}/${year} ${week}`;
    }

    const _transformTemp = (temp, text) => `${text}${(temp - 273.15).toFixed(0)} ℃`;

    const _transformData = ({ dt, main, weather, name, wind }) => {
        const date = _transformDate(new Date(dt * 1000)),
              temp = _transformTemp(main.temp,''),
              clouds = weather[0].description,
              city = name,
              icon = `${apiIcon}${weather[0].icon}@2x.png`;
        const tempMin =  _transformTemp(main.temp_max,'Max temp: '),
              tempMax = _transformTemp(main.temp_min,'Min temp: '),
              humidity = `Humidity: ${main.humidity} %`,
              feelLikes = _transformTemp(main.feels_like,'Feel likes: '),
              windSpeed = `Speed wind: ${wind.speed.toFixed(1)}m/s`;
        const list = [tempMin, tempMax, humidity, feelLikes, windSpeed];

        return {
            date,
            temp,
            clouds,
            city,
            icon,
            list
        }
    }

    return {
        getDateCity,
        setProcess,
        process,
        clearError
    };
}

export default useWeatherService;