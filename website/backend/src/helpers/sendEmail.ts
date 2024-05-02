import nodemailer from 'nodemailer'
import { EMAIL_PASS } from '../config/constants'

const sendEmail = async (email: any) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // For example, using Gmail
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: email.from,
                pass: EMAIL_PASS,
            },
        })
        for (let i = 0; i < email.to.length; i++) {
            await transporter.sendMail({
                from: 'Hotel Plaza <alizakariya45@gmail.com>',
                to: email.to[i],
                subject: email.subject[i],
                text: email.text[i],
            })
        }

        console.log('Email sent successfully')
    } catch (error) {
        console.error('Failed to send email', error)
    }
}

export default sendEmail
