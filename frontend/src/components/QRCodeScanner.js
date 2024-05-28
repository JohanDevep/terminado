import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";

function QRCodeScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrContent, setQrContent] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let stream = null;

    const constraints = { video: { facingMode: "environment" } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (streamObj) {
        stream = streamObj;
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        setIsScanning(true);
      })
      .catch(function (error) {
        console.error("Error al acceder a la cámara:", error);
        // Puedes mostrar un mensaje de error al usuario aquí
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    function tick() {
      if (
        isScanning &&
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
      ) {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setQrContent(code.data);
          setIsScanning(false); // Detener el escaneo después de detectar un código QR
        }
      }
      requestAnimationFrame(tick);
    }

    if (isScanning) {
      const id = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(id);
    }
  }, [isScanning]);

  return (
    <div className="escaner-qr">
      <video ref={videoRef} width="300" height="200" autoPlay muted></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <form action="/ListaDeReproduccionCliente" method="get" id="form1">
        <input
          className="escaner-qr__input-code"
          type="text"
          value={qrContent}
          onChange={(e) => setQrContent(e.target.value)}
        />
        <button
          className="escaner-qr__btn-unite-fiesta"
          type="submit"
          form="form1"
        >
          ¡&Uacute;NETE A LA FIESTA!
        </button>
      </form>
    </div>
  );
}

export default QRCodeScanner;
