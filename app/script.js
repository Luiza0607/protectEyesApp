import React, { useState } from 'react';
import { useMemo } from 'react';
import { render } from 'react-dom';

const App = () => {
	const [status, setStatus] = useState('off');
	const [time, setTime] = useState(0);
	const [timer, setTimer] = useState(null);

	const formatTime = (time) => {
		let seconds = time % 60;
		let minutes = Math.floor(time / 60);

		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}

		return `${minutes}:${seconds}`;
	};

	const timing = useMemo(() => formatTime(time, [time]));

	const startTimer = () => {
		setTime(1200);
		setStatus('work');
		setTimer(setInterval(() => {
			setTime(time => time - 1);
		}, 1000)
		);
	};

	if (time < 0) {
		if (status === 'work') {
			setStatus('rest');
			setTime(20);
		}
		if (status === 'rest') {
			setStatus('work');
			setTime(1200);
		}
	}

	const stopTimer = () => {
		setTime(0);
		setStatus('off');
		clearInterval(timer);
	};

	const closeApp = () => {
		window.close();
	};

	return (
		<div>
			<h1>Protect your eyes</h1>
			{status === 'off' && (
				<div>
					<p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
					<p>This app will help you track your time and inform you when it's time to rest.</p>
				</div>
			)}
			{status === 'work' && (<img src="./images/work.png" />)}
			{status === 'rest' && (<img src="./images/rest.png" />)}
			{status !== 'off' && (<div className="timer">{timing}</div>)}
			{status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
			{status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
			<button className="btn btn-close" onClick={closeApp}>X</button>
		</div>
	);
};

render(<App />, document.querySelector('#app'));
