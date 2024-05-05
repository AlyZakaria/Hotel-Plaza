import nodemailer from 'nodemailer'
import { EMAIL_PASS } from '../../config/constants'

class Email {
    private from: string = 'alizakariya45@gmail.com'
    private to: string
    private subject: string
    protected html: any = ''

    constructor(to: string, subject: string) {
        this.to = to
        this.subject = subject
    }
    public set setHtml(html: string) {
        this.html = html
    }
    async sendMail() {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // For example, using Gmail
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: this.from,
                    pass: EMAIL_PASS,
                },
            })
            transporter.sendMail({
                from: `Hotel Plaza <${this.from}>`,
                to: this.to,
                subject: this.subject,
                html: this.html,
            })

            console.log('Email sent successfully')
        } catch (error) {
            console.error('Failed to send email', error)
        }
    }

    getFrom() {
        return this.from
    }

    getTo() {
        return this.to
    }

    getSubject() {
        return this.subject
    }

    getHtml() {
        return this.html
    }
}

export default Email
