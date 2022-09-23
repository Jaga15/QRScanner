import { useState} from 'react'
import './app.styles.scss'
import QRScanner from './components/QRScanner/QRScanner'


function App() {

  const [isQR,setisQR]=useState(true);

  const scanQrCode = () => {
    setisQR(true);
  }

  const scanBarCode = () => {
    setisQR(false);
  }

  return (
    <div className='flex flex-col items-center bg-purple-100 h-screen pt-20'>
      <div className='flex w-4/12 align-middle justify-center '>
        <QRScanner isQR={isQR}/>
      </div>
      <div className='flex  w-4/12 items-center  justify-around py-10'>
        <button onClick={scanQrCode} className="p-3 bg-purple-500 rounded-md text-white" >QRCode</button>
        <button onClick={scanBarCode} className="p-3 bg-purple-500 rounded-md text-white" >BarCode</button>
      </div>
    </div>
    )
}

export default App;
