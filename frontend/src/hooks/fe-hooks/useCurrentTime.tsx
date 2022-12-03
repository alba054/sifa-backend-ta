function useCurrentTime() {
  const currentTime = new Date()
      .toLocaleTimeString("id", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replaceAll(".", ":");
  
  return currentTime
}

export default useCurrentTime