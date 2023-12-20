export const id = 'documentation'

export const cron = '0/5 * * * *'

export async function execute() {
	await new Promise((r) => {
		setTimeout(r, 2 * 60 * 1000)
	})
}
