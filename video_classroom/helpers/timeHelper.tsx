import moment from "moment";

function pad(num: number) {
    return ("0"+num).slice(-2);
}

export const secToTime = (secs: number): moment.Moment =>  {
    var minutes = Math.floor(secs / 60)
    secs = secs%60
    var hours = Math.floor(minutes/60)
    minutes = minutes%60
    return moment(pad(hours)+pad(minutes)+pad(secs), 'hhmmss')
}