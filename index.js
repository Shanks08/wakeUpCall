require('dotenv').config();
const app = require('express')();
const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
	res.send('UP');
});

app.get('/api/wakeUpCall', (req, res) => {
	client.calls
		.create({
			url: 'http://demo.twilio.com/docs/voice.xml',
			to: '+918013307251',
			from: '+14847390616',
		})
		.then((call) => {
			console.log(call.sid);
			res.send(`call ${call.sid} on the way`);
		})
		.catch((err) => res.send(err.message));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Up on port ${PORT}`));
