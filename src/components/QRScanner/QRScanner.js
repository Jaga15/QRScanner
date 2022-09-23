import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = (props) => {
    var flagee=0;
    console.log(props)
    console.log(props.isQR)
const r=props.isQR;
    Html5Qrcode.getCameras().then((devices) => {
        if (devices && devices.length) {
            const cameraId = devices[0].id;

            let qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
                let minEdgePercentage = 0.7; 
                let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
                let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
                // console.log("IM : ",r)
                return r ? {
                    width: qrboxSize,
                    height: qrboxSize
                } : {
                    width: viewfinderHeight,
                    height: qrboxSize/2
                };
            }

            var html5qrcodeConfig = {
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true 
                 }
            };

            const html5QrCode = new Html5Qrcode("scanner",html5qrcodeConfig);

            const qrConfig = { fps: 10, qrbox:qrboxFunction };
            console.log("R : ",r);

            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                console.log(decodedText);
                console.log(decodedResult);
                console.log(html5QrCode.isScanning)
                html5QrCode.pause()
                stopScan();
                console.log(html5QrCode.isScanning)
            }

            const stopScan = () => {
                html5QrCode.stop().then(() => {
                    console.log("Scanning Stopped.")
                }).catch((err) => {
                    console.log("Error while closing the camera.")
                });
            }

            const qrErrorCallback = (errorMessage) => {
                console.log("Reading for QR... ",errorMessage)
            }

            html5QrCode.start(
                { facingMode: "environment" },
                qrConfig,
                qrCodeSuccessCallback,
                qrErrorCallback
            ).catch((err) => {
                console.log("Camera start error")
            });

        }
    }).catch(err => {
        console.log("Please allow to use the camera.")
    });

    return (
        <>
        <div id="scanner"></div>
        </>
    )
}
export default QRScanner;