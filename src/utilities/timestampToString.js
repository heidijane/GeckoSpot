export const timestampToDateString = (ts) => {
    // convert unix timestamp to milliseconds
    const ts_ms = ts * 1000
    // initialize new Date object
    var date_ob = new Date(ts_ms)
    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear()
    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2)
    // date as YYYY-MM-DD format
    return month + "/" + date + "/" + year
}