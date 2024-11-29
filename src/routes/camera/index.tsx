import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/camera/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = document.querySelector("video");
      if (!video) {
        return;
      }
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video
          .play()
          .then(() => {
            console.log("Playing");
          })
          .catch((error) => {
            console.error("Error playing video", error);
          });
      };
    });
  }, []);
  return (
    <div className="grid place-items-center">
      <video
        autoPlay
        className="border"
        style={{
          transform: "scaleX(-1)",
        }}
      ></video>
    </div>
  );
}
