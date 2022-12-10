import { useState } from "react";
import { IFELabFreeCardComp } from "src/pages/final-exam/student/lab-free/FELabFreeCardComp";

export interface IUseDict {
  [key: string]: any;
}

export default function useDict(defaultValue: any) {
  const [array, setArray] = useState<{[key: number]: any}>(defaultValue);

  function push(element: any) {
    setArray((a: any) => ({ ...a, element }));
  }

  function remove(key: string|number) {
    setArray((a:any)=>{
      const copy = {...a};
      delete copy[key];
  
      return copy;
    })
  }

  function clear() {
    setArray({});
  }

  return { array, set: setArray, push, remove, clear };
}
