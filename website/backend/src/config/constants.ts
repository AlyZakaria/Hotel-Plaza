import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN, EMAIL_PASS, PORT } =
    process.env

export { NODE_ENV, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN, EMAIL_PASS, PORT }
