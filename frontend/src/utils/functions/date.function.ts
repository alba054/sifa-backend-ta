export function getFEDate(date: Date, start: Date, end: Date, format?: string) {
  let d = date.toLocaleDateString("id", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  let s =
    datePaddingStart(start.getHours()) +
    ":" +
    datePaddingStart(start.getMinutes());
  let e =
    datePaddingStart(end.getHours()) + ":" + datePaddingStart(end.getMinutes());

  return `${d} (${s} - ${e} ${format || "WITA"})`;
}

export function datePaddingStart(d: number) {
  return d.toString().padStart(2, "0");
}

export function extractDate(date: Date) {
  let d = date.toLocaleDateString("id", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return d;
}

export function dateToRange(start: Date, end: Date, format?: string) {
  let s =
    datePaddingStart(start.getHours()) +
    ":" +
    datePaddingStart(start.getMinutes());
  let e =
    datePaddingStart(end.getHours()) + ":" + datePaddingStart(end.getMinutes());

  return `${s} - ${e} ${format || ""}`;
}

export function extractDay(date:Date){
  return date.toLocaleDateString("id", { weekday: 'long' });  
}