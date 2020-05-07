export const truncate = (string, length=100, ending="...") => {
    if (string.length <= length) {
        return string
    } else {
        let trimmedString = string.substring(0, length)
        trimmedString = trimmedString.trim() //remove extra whitespace
        return trimmedString+ending
    }
}