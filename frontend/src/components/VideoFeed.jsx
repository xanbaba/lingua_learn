import { useEffect, useRef } from "react";

const VideoFeed = ({ onPrediction }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const lastSentRef = useRef(0);
  const targetFPS = 1;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { frameRate: { ideal: 30, max: 30 } } })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;

        socketRef.current = new WebSocket(process.env.REACT_APP_API_WS_URL);

        const handleServerMessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            const maxEntry = Object.entries(data.data).reduce(
              (max, [letter, value]) => {
                return value > max.value ? { letter, value } : max;
              },
              { letter: null, value: -Infinity }
            );

            console.log(
              `Letter: ${maxEntry.letter}, Probability: ${maxEntry.value}`
            );
            if (onPrediction && maxEntry.letter) {
              onPrediction({
                letter: maxEntry.letter,
                probability: maxEntry.value,
              });
            }
          } catch (e) {
            console.log("[WS] raw message:", event.data);
          }
        };

        socketRef.current.onopen = () => console.log("[WS] connected");
        socketRef.current.onmessage = handleServerMessage;
        socketRef.current.onerror = (err) => console.error("[WS] error:", err);
        socketRef.current.onclose = () => console.log("[WS] disconnected");

        const sendFrame = (time) => {
          const now = performance.now();
          const elapsed = now - lastSentRef.current;
          const interval = 1000 / targetFPS;

          if (
            elapsed > interval &&
            socketRef.current.readyState === WebSocket.OPEN
          ) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8); // quality 0–1

            socketRef.current.send(
              JSON.stringify({
                type: "frame",
                data: dataUrl,
              })
            );

            lastSentRef.current = now;
            console.log("Sent frame");
          }

          requestAnimationFrame(sendFrame);
        };

        requestAnimationFrame(sendFrame);
      })
      .catch((err) => console.error("Error accessing webcam:", err));

    return () => {
      if (socketRef.current) {
        socketRef.current.onopen = null;
        socketRef.current.onmessage = null;
        socketRef.current.onerror = null;
        socketRef.current.onclose = null;
        socketRef.current.close();
      }
    };
  }, [onPrediction]);

  return (
    <div className="glassmorphism-inner rounded-lg overflow-hidden w-full h-full flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="object-cover w-full h-full"
      />
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default VideoFeed;
