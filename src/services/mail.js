const nodemailer = require('nodemailer')

const { MAIL_SERVICE } = require('../utils/constants')

let transporter

if (!transporter) {
    transporter = nodemailer.createTransport({
        host: MAIL_SERVICE.HOST,
        secure: false,
        port: 587,
        auth: {
            user: MAIL_SERVICE.USER,
            pass: MAIL_SERVICE.PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        },
    })
}

module.exports = ({ from = MAIL_SERVICE.USER, to, subject, text, html, attachments }) =>
    new Promise((resolve, reject) =>
        transporter.sendMail(
            {
                from,
                to,
                text: text ? text : null,
                html: html ? html : null,
                subject,
                attachments: attachments || [],
            },
            (error, info) => {
                if (error) {
                    return reject(error)
                }

                return resolve(info)
            }
        )
    )