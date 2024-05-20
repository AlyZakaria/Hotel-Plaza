function commonDays(
    offerStartDate: Date,
    offerEndDate: Date,
    checkinDate: any,
    checkoutDate: any
): any {
    // Calculate intersection
    const intersectionStart: any =
        offerStartDate > checkinDate ? offerStartDate : checkinDate
    const intersectionEnd: any =
        offerEndDate < checkoutDate ? offerEndDate : checkoutDate

    // Calculate common days
    // round up to the nearest whole number

    const commonDays = Math.ceil(
        (intersectionEnd - intersectionStart) / (1000 * 60 * 60 * 24)
    ) // Convert milliseconds to days

    console.log(`Common days: ${commonDays}`)
    return commonDays
}

export default commonDays
