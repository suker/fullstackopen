const Notification = ({ msg, error = false }) => {
	return (
		<h4
			style={{
				borderStyle: 'solid',
				borderColor: `${error ? '#ec5353' : '#109010'}`,
				borderWidth: 2,
				color: `${error ? '#ec5353' : '#109010'}`,
			}}
		>
			{msg}
		</h4>
	);
};

export default Notification;
