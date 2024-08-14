const Notification = ({ msg }) => {
	const message_styles = {
		fontSize: 20,
		padding: 8,
		border: '3px solid green',
		backgroundColor: '#d8d6d6',
		color: 'green',
		fontWeight: 'bold',
	};

	if (!msg) return;

	return <p style={message_styles}>{msg}</p>;
};

export default Notification;
