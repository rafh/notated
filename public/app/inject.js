import { annotate } from 'rough-notation'

const removeMarking = (event, elmClass, location) => {
	let currentElm = event.target
	let elmClassList = currentElm.classList

	elmClassList.remove('is-marked', elmClass)

	location === 'prev' && currentElm.previousElementSibling.remove()
	location === 'next' && currentElm.nextElementSibling.remove()
}

const highlightWord = (event) => {
	event.preventDefault()
	let currentElm = event.target
	let elmClassList = currentElm.classList

	if (elmClassList.contains('is-marked')) {
		if (elmClassList.contains('is-highlighted')) {
			removeMarking(event, 'is-highlighted', 'prev')
			return
		}
		if (elmClassList.contains('is-underlined')) {
			removeMarking(event, 'is-underlined', 'next')
			return
		}
		if (elmClassList.contains('is-crossed')) {
			removeMarking(event, 'is-crossed', 'next')
			return
		}
		if (elmClassList.contains('is-boxed')) {
			removeMarking(event, 'is-boxed', 'next')
			return
		}
	}

	let annotation

	if (event.shiftKey) {
		annotation = annotate(currentElm, {
			type: 'highlight',
			padding: [2, 2],
			color: '#FFC107',
		})
		elmClassList.add('is-marked', 'is-highlighted')
	} else if (event.altKey) {
		annotation = annotate(currentElm, {
			type: 'strike-through',
			color: '#f44336',
		})
		elmClassList.add('is-marked', 'is-underlined')
	} else if (event.metaKey || event.ctrlKey) {
		annotation = annotate(currentElm, {
			type: 'underline',
			color: '#679267',
		})
		elmClassList.add('is-marked', 'is-crossed')
	} else {
		annotation = annotate(currentElm, {
			type: 'box',
			padding: [2, 2],
			strokeWidth: 1.5,
			iterations: 2,
			color: '#0d47a1',
		})
		elmClassList.add('is-marked', 'is-boxed')
	}

	annotation.show()

	if (annotation._config.type === 'highlight') {
		Array.from(annotation._svg.childNodes).map((x) =>
			x.setAttribute('stroke-width', 15),
		)
	}
}

const createSpans = () => {
	let bodyClassList = document.body.classList

	if (bodyClassList.contains('is-notated')) return
	bodyClassList.add('is-notated')

	document
		.querySelectorAll(['p', 'p > div', '.docs-gm span', 'main span'])
		.forEach((x) => {
			let generatedHTML = ``
			x.childNodes.forEach((x) => {
				if (x.nodeName === '#text') {
					generatedHTML += x.nodeValue
						.split(' ')
						.map((w) => `<span class="word">${w}</span> `)
						.join('')
				} else {
					generatedHTML += x.outerHTML
				}
			})
			x.innerHTML = generatedHTML
		})

	document.querySelectorAll(['p a']).forEach((x) => {
		let a = x.innerText
			.split(' ')
			.map((w) => `<span class="word">${w}</span> `)
			.join('')
		x.innerHTML = x.innerHTML.replace(x.innerText, a)
	})
}

const addSpanEvents = () => {
	document.querySelectorAll('.word').forEach((x) =>
		x.addEventListener(
			'click',
			function (event) {
				// prevent shift click highlighting
				document.getSelection().removeAllRanges()
				highlightWord(event)
			},
			false,
		),
	)
}

const addStyles = () => {
	const docsElm = document.querySelector('[class*=word-node]')
	const css = `
			.docs-gm .word {
				font-size: ${docsElm && docsElm.style.fontSize};
				font-family: ${docsElm && docsElm.style.fontFamily};	
				font-weight: ${docsElm && docsElm.style.fontWeight};		
			}
		`

	document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`)

	createSpans()
	addSpanEvents()
}

addStyles()
