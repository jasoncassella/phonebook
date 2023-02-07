const Notification = ({ notification }) => {
	if (notification === null) return null;
	return (
		<div className='notification'>
			<h1>{notification}</h1>
		</div>
	);
};

export default Notification;
