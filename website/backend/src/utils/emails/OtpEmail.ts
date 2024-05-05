import Email from './Email'
import readTemplate from '../../helpers/readTemplate'
class OtpEmail extends Email {
    private otp: string
    private static path = 'otpEmail.html'
    private static subject = 'Your OTP for Hotel Plaza'
    constructor(to: any, otp: any) {
        super(to, OtpEmail.subject)
        this.otp = otp
    }
    // send Email
    async sendOtpEmail() {
        try {
            const html = readTemplate(OtpEmail.path, { otpCode: this.otp })
            this.setHtml = html
            await this.sendMail()
        } catch (error) {
            console.error('Failed to send email', error)
        }
    }

    getOtp() {
        return this.otp
    }
}

export default OtpEmail
