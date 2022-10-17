import { useEffect } from "react"

const useLockOverflow = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return null
}

export default useLockOverflow;