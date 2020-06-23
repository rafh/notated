/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import App from './App';
import './content.css';


class Main extends React.Component {
	render() {

		chrome.runtime.onMessage.addListener(function (a, b, sendResponse) {
			// console.log(chrome)
			// chrome.windows.getCurrent(function (currentWindow) {
			// 	chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
			// 		// inject content_script to current tab
			// 		chrome.tabs.executeScript(activeTabs[0].id, {file: 'content_script.js', allFrames: false});
			// 	});
			// });
		});
		return (
			<Frame
				head={[
					<link
						type='text/css'
						rel='stylesheet'
						href={chrome.runtime.getURL('/static/css/content.css')}
					></link>,
				]}
			>
				<FrameContextConsumer>
					{
						// Callback is invoked with iframe's window and document instances
						({ document, window }) => {
							chrome.runtime.onMessage.addListener(function (
								request,
								sender,
								sendResponse,
								a,
							) {

									console.log({request})
									console.log({sender})
									console.log({sendResponse})
								if (request.command === 'init') {

								} else {
								}
								sendResponse({ result: 'success' });
							});

							return (
								<App
									document={document}
									window={window}
									isExt={true}
								/>
							);
						}
					}
				</FrameContextConsumer>
			</Frame>
		);
	}
}

const app = document.createElement('div');
app.id = 'my-extension-root';

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = 'none';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'clicked_browser_action') {
		toggle();
	}
});

function toggle() {
	if (app.style.display === 'none') {
		app.style.display = 'block';
	} else {
		app.style.display = 'none';
	}
}
