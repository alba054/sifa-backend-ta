import { useState } from "react";

const usePrintHook = (message: string) => {
    const [resMessage, setResMessage] = useState<string>("Message is :" + message)
    return resMessage;
}

export default usePrintHook;