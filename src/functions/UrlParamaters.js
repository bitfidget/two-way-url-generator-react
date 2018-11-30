const UrlParamaters = {
    stringify: function (items) {
        let ret = ''
        Object.keys(items).map(function (item, index) {
            ret += joinWith(index)
            ret += item
            ret += '='
            ret += items[item]
        })
        return ret
    },
    objectify: function (str) {
        let items = {}
        str.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                items[$1] = $3
            }
        );
        return items
    }
}

const joinWith = (i) => {
    if (i > 0) {
        return '&'
    } else {
        return '?'
    }
}

export default UrlParamaters