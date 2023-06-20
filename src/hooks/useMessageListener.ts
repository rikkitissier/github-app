import { useEffect } from "react"

const useMessageListener = (eventType: string, handler: Function) => {
	useEffect(() => {
		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, [handler]);

  const handleMessage = (event: MessageEvent) => {
    if( event.data.type === eventType ) {
      handler(event.data.payload)
    }
  }
}

export { useMessageListener }