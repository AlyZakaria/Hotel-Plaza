function base64toBlob(image: any): any {
    // Split into two parts
    const parts = image.split(';base64,')

    // Hold the content type
    const imageType = parts[0].split(':')[1]

    // Decode Base64 string
    const byteCharacters = atob(parts[1])
    const byteArrays = []

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i))
    }

    const byteArray = new Uint8Array(byteArrays)
    return { byteArray: byteArray, mimetype: imageType }
}

export default base64toBlob
