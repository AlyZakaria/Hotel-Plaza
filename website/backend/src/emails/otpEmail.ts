import email from '../interfaces/email'

const makeEmail = (optData: any) => {
    const email: email = {
        from: 'alizakariya45@gmail.com',
        to: [optData.email],
        subject: ['Your OTP for Hotel Plaza'],
        text: [`Your verification code is: ${optData.otp}`],
    }
    return email
}

export default makeEmail
