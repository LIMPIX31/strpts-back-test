const url = new URL('http://localhost:9000/idlike/balance')
const payload = JSON.stringify({
	amount: -2,
})
const headers = {
	'Content-Type': 'application/json'
}

console.time('benchmark')
const requests = Array.from({ length: 10_000 }, (_, idx) => {
	return fetch(url, {
		method: 'PUT',
		body: payload,
		headers,
	}).then((res) => {
		console.log(`${idx}: ${res.status}`)
		return res
	})
})

const job = Promise.all(requests)

const statuses = await job.then((items) => items.map(({ status }) => ({ status })))
console.timeEnd('benchmark')

const result = Object.groupBy(statuses, ({ status }) => status)
console.log(`Passed: ${result['200']?.length ?? 0}`)
console.log(`Failed: ${result['400']?.length ?? 0}`)
console.log(`Crashed: ${result['500']?.length ?? 0}`)
