import React from 'react'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'
import { getCroppedImg, getRotatedImage } from './CanvasUtils'


const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
  }

export default function CropImage({classes}) {

    const [imageSrc, setImageSrc] = React.useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }
    
      const showCroppedImage = async () => {
        try {
          const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            rotation
          )
          console.log('donee', { croppedImage })
          setCroppedImage(croppedImage)
        } catch (e) {
          console.error(e)
        }
      }
    
      const onClose = () => {
        setCroppedImage(null)
      }
    
      const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]
          console.log(file)
          let imageDataUrl = await readFile(file);
    
          try {
            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
              imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }
          } catch (e) {
            console.warn('failed to detect the orientation')
          }
    
          setImageSrc(imageDataUrl)
        }
      }

  return (
    <div>

{imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className='flex'>
            <div className={classes.sliderContainer}>
              <div>Zoom</div>
              <input 
                    id="default-range" 
                    classes={{ root: classes.slider }}
                    onChange={(e, zoom) => setZoom(zoom)} 
                    type="range" 
                    step="0.1"
                    value="zoom"
                    min="1"
                    max="3"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    </input>
            </div>
            <div className={classes.sliderContainer}>
              <div>Rotation</div>
              <input 
                    id="default-range" 
                    classes={{ root: classes.slider }}
                    onChange={(e, rotation) => setRotation(rotation)} 
                    type="range" 
                    step="1"
                    value="rotation"
                    min="0"
                    max="360"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                    </input>
            </div>
            <button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </button>
          </div>
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/" />
      )}
      
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}
