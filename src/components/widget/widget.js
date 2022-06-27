import { Container, Row, Col } from "react-bootstrap"
import './widget.scss';

const Widget = ({ dataWeather = {} }) => {
	const { temp, date, clouds, list = [], icon = '' } = dataWeather;

	return (
		<Container className="widget position-relative d-flex text-light flex-wrap flex-column">
			<Col>
				<Row>
					<div className="fs-3 text-center">
						{date}
					</div>
				</Row>
				<Row>
					<h2 className="widget__temp text-center">
						{temp}
					</h2>
				</Row>
				<Row>
					<div className="fs-3 text-center">
						{clouds}
						{
							icon ? <img className="" src={icon} alt=""/> : null
						}
					</div>
				</Row>
			</Col>
			<ul className='text-start mx-1 fs-5'>
				{
					list.map( (item, i) => {
						return <li key={i} className='px-2 mt-3'>{item}</li>
					})
				}
			</ul>
		</Container>
	)
}

export default Widget;