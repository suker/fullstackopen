const Notification = ({ message }) => {
	const messageStyle = {
		borderStyle: 'solid',
		borderColor: !message
			? null
			: message.type === 'error'
				? '#ec5353'
				: '#109010',
		borderWidth: 2,
		color: !message
			? null
			: message.type === 'error'
				? '#ec5353'
				: '#109010',
	};

	return <h4 style={messageStyle}>{message.text}</h4>;
};

export default Notification;
