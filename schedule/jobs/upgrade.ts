export const id = 'upgrade'

export const cron = '0/11 * * * *'

export async function execute() {
	await new Promise((r) => {
		setTimeout(r, 2 * 60 * 1000)
	})
}
