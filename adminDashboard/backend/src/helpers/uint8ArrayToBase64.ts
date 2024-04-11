function uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binary = ''
    uint8Array.forEach((byte) => {
        binary += String.fromCharCode(byte)
    })
    return btoa(binary)
}

export default uint8ArrayToBase64
