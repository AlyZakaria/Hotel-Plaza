function base64toBlob(image: any, base64: string): any {
    // Split into two parts
    console.log(image)
    // Hold the content type
    const imageType = image.mimetype

    // Decode Base64 string
    const byteCharacters = atob(base64)
    const byteArrays = []

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i))
    }

    const byteArray = new Uint8Array(byteArrays)
    return { byteArray: byteArray, mimetype: imageType }
}

export default base64toBlob
