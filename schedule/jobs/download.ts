export const id = 'download'

export const cron = '0/6 * * * *'

export async function execute() {
	await new Promise((r) => {
		setTimeout(r, 2 * 60 * 1000)
	})
}
