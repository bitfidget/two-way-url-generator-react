/*
 * @Author: Kriss Heimanis 
 * @Date: 2017-12-22 12:21:08 
 * @Last Modified by: Kriss Heimanis
 * @Last Modified time: 2018-11-30 17:07:11

 * Helper function to simplify conditional classNames.
 * Accepts object as args.
 * Object item key is the className, the value is the condition that must be met to include that className.
 * Either item can be dynamic
*/

const conditionalClassNames = args => {
    let ret = []
    Object.keys(args).map(function(key) {
        if (args[key]) {
            ret.push(key)
        }
    })
    return ret.join(' ')
}

export default conditionalClassNames
