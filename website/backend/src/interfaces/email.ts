interface email {
    from: string
    to: string[]
    subject: string[]
    text?: string[]
    html?: any
}

export default email
