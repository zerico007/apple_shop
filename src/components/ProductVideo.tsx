import { Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player";

interface ProductVideoProps {
  videoURL: string;
  productId: string;
  showCloseButton: () => void;
  closeButton: boolean;
  mountVideo: boolean;
  setMountVideo: Dispatch<SetStateAction<boolean>>;
  mobile: boolean;
}

function ProductVideo({
  videoURL,
  productId,
  showCloseButton,
  closeButton,
  setMountVideo,
  mountVideo,
  mobile,
}: ProductVideoProps) {
  return (
    <div className={`video-div video-${productId}`} style={{ top: "0px" }}>
      <ReactPlayer
        className="video-player"
        style={{ left: mobile ? "0" : "25vw" }}
        url={videoURL}
        playing={mountVideo}
        controls={false}
        width={mobile ? "97vw" : "600px"}
        height={"500px"}
        pip={true}
        playsinline={true}
        stopOnUnmount={true}
      />
      {closeButton && (
        <button
          className="close-video"
          onClick={() => {
            showCloseButton();
            setMountVideo(!mountVideo);
          }}
        >
          Close <i className="far fa-times-circle"></i>
        </button>
      )}
    </div>
  );
}

export default ProductVideo;
