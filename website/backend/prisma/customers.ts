import { customerData } from '../src/interfaces'

enum gender {
    male,
    female,
}

const customers: customerData[] = [
    {
        email: 'ali.zakariya1929@outlook.com',
        password: '12345678',
        fname: 'Aly',
        lname: 'Zakaria',
        phone: '01154567214', // Starts with '01'
        image: null,
        imageType: null,
        gender: gender.male,
    },
    {
        email: 'alizakariya45@gmail.com',
        password: '12345678',
        fname: 'Ali',
        lname: 'Zakaria',
        phone: '01000000000', // Starts with '01'
        image: null,
        imageType: null,
        gender: gender.male,
    },
]
export default customers
