import { Base64 } from 'js-base64'

const HashString = (string, decrypt) => {
    if (decrypt) {
        return Base64.decode(string)
    } else {
        return Base64.encode(string)
    }
}

export default HashString