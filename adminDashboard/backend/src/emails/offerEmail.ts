import email from '../interfaces/email'
import offer from '../interfaces/offer'
import roomType from '../interfaces/roomType'
import customer from '../interfaces/customer'


function capitalize(name: string): any {
    return name[0].toUpperCase() + name.slice(1)
}

const makeEmail = (offer: offer, roomType: roomType, customers: customer[]) => {
    let email: email = {
        from: '',
        to: [],
        subject: [],
        text: [],
    }
    email.to = customers.map((customer) => customer.email)

    email.subject = customers.map(
        (customer) => `Exclusive Offer Just for You - Discover with Hotel Plaza`
    )

    email.text = customers.map(
        (customer) =>
            `Dear ${capitalize(customer.fname)}
            experience luxury like never before! For a limited time, we're thrilled to offer you an exclusive **${offer.percentage} discount** on our ${roomType.name} Rooms at Hotel Plaza.
            Whether you're planning a romantic getaway, a family vacation, or a solo adventure, Hotel Plaza promises an unforgettable stay. Picture yourself sipping cocktails by the pool, exploring local markets, and indulging in world-class cuisine.
            **Book now** to secure your spot! Simply call our reservations team at [Phone Number]. Don't miss out on this incredible offer!
            We can't wait to welcome you to Plaza Hotel. Your dream escape awaits!
            
            Warm regards,
            The Plaza Hotel Team`
    )
    email.from = `alizakariya45@gmail.com`

    return email
}

export default makeEmail
