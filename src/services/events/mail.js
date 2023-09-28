const { EventEmitter } = require('node:events')

const sendMail = require('../mail')

const emitter = new EventEmitter()

emitter.on('sendMail', ({ from, to, subject, text, html, attachments }) => {

    setImmediate(async () => {
        try {
            await sendMail({
                from,
                to,
                subject,
                text,
                html,
                attachments
            })
        } catch (e) {
            console.log('ERROR is', e)
            console.error(`ERROR sendMail: ${JSON.stringify(e)}`)
        }
    })
})

module.exports = {
    emailEmitter: emitter
}