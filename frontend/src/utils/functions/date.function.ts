export function getFEDate(date: Date, start: Date, end: Date, format?:string) {
  let d = date.toLocaleDateString("id", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  let s = datePaddingStart(start.getHours())+":"+datePaddingStart(start.getMinutes())
  let e = datePaddingStart(end.getHours())+":"+datePaddingStart(end.getMinutes())

  return `${d} (${s} - ${e} ${format || "WITA"})`
}

export function datePaddingStart(d:number){
  return d.toString().padStart(2, '0')
}
