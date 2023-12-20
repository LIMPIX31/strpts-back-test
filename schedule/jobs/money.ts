export const id = 'money'

export const cron = '0/8 * * * *'

export async function execute() {
	await new Promise((r) => {
		setTimeout(r, 2 * 60 * 1000)
	})
}
