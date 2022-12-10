import { useEffect } from 'react';
import useArray from 'src/hooks/fe-hooks/useArray';


export default function useFELabFreeArray(LabFreeCardArray: any) {
  const { array, set, push, remove, filter, update, clear } = useArray([
    LabFreeCardArray
  ]);
  
  let applicationDone= array.length;

  useEffect(()=>{
    applicationDone= array.length
  }, [])

  useEffect(() => {
    applicationDone+= 1
  }, [array])
  
  return { array, set, push, remove, filter, update, clear, applicationDone }
}