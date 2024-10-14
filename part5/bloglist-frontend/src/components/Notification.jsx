const Notification = ({ msg }) => {
	const messageStyle = {
		borderStyle: 'solid',
		borderColor: !msg
			? null
			: msg.type === 'error'
				? '#ec5353'
				: '#109010',
		borderWidth: 2,
		color: !msg
			? null
			: msg.type === 'error'
				? '#ec5353'
				: '#109010',
	};

	return <h4 style={messageStyle}>{msg.text}</h4>;
};

export default Notification;
