import { Base64 } from 'js-base64'

const HashString = {
    decode: function (string) {
        return Base64.decode(string)
    },
    encode: function (string) {
        return Base64.encode(string)
    }
}

export default HashString