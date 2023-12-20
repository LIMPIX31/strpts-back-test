export const id = 'senior'

export const cron = '0/10 * * * *'

export async function execute() {
	await new Promise((r) => {
		setTimeout(r, 2 * 60 * 1000)
	})
}
