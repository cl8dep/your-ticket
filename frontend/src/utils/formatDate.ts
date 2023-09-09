export function formatDate(date: string) {
    var dateParsed = new Date(Date.parse(date));
    return new Intl.DateTimeFormat().format(dateParsed);
}