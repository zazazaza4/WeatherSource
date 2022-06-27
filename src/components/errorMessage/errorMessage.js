import img from './error.gif';

const ErrorMessage = () => {
	return (
		<div className="text-center">
			<img 
				className="mb-3 rounded-pill w-50" 
				src={img} 
				alt="Error"
			/>
			<p className='text-white fs-3'>This city was not found</p>
		</div>
	)
}

export default ErrorMessage;