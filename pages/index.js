import Head from 'next/head'
import Editor from '../components/editor'

import { toPng, toBlob } from 'html-to-image';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { TwitterPicker } from 'react-color'

import { ColorSwatchIcon } from '@heroicons/react/solid'

function downloadImage(elementRef) {
  toPng(elementRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'notes.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
}

function copyAsPng(elementRef) {
  toBlob(elementRef.current)
      .then((blob) => {
        if (!blob) {
          console.error('unknown error occurred exporting image')
          toast.error('Error exporting image. Check the console for details')
          return
        }

        const item = new ClipboardItem({ 'image/png': blob })
        navigator.clipboard
          .write([item])
          .then(() => {
            toast.success('Copied png image to clipboard', {duration: 2000})
          })
          .catch((err) => {
            console.error(err)
            toast.error(
              'Error copying image to clipboard. Check the console for details'
            )
          })
      })
      .catch((err) => {
        console.error(err)
        toast.error('Error exporting image. Check the console for details')
      })
}

export default function Home() {
  let ele = useRef()

  let [eleWidth, setEleWidth] = useState('inherit')
  let [pickerOpen, setPickerOpen] = useState(false)
  let [bgColor, setBgColor] = useState('white')

  const togglePicker = () => {
    console.log(pickerOpen)
    setPickerOpen(!pickerOpen)
  }

  const colorChange = (color) => {
    setBgColor(color.hex)
  }

  const optimizeForTwitter = () => {
    // aspect ratio - 2/1 (width/height)
    let currentEle = ele.current
    setEleWidth(currentEle.clientHeight * 2)

    toast((t) => (
      <div className='flex items-start justify-center space-x-2'>
        <img className='w-6 h-6' src="/twitter.svg" />
        <p>Image optimized for Twitter</p>
      </div>
    ), {
      duration: 2000
    });
  }

  return (
    <section className='bg-gray-100 h-screen'>
      <div className='px-2 lg:max-w-3xl lg:mx-auto pt-24'>
        <Toaster/>
        <Head>
          <title>Writer Share</title>
        </Head>
        <div>
          <Editor bgColor={bgColor} eleWidth={eleWidth} ele={ele} />
          <div className='mt-12 text-right max-w-[600px] mx-auto flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:justify-end'>
            <button onClick={togglePicker} className='relative p-2 outline-none bg-white shadow-md rounded-full hover:shadow'>
              <ColorSwatchIcon className='w-4 h-4 fill-orange-400 stroke-orange-800' />
              {
                pickerOpen &&
                <div className='absolute top-12 -left-2'  onClick={(e) => e.stopPropagation()}>
                  <TwitterPicker
                    colors={[
                      "#ffa86b",
                      "#ffdb79",
                      "#b3f2b2",
                      "#77cdff",
                      "#ff9fb8",
                      "#ffffff"
                    ]}
                    onChange={colorChange}
                    color={bgColor}
                  />
                </div>
              }
            </button>
            <button className='py-1 px-2 rounded-md shadow-md bg-white hover:shadow ' onClick={optimizeForTwitter}>
              Optimize for Twitter
            </button>
            <button className='py-1 px-2 rounded-md shadow-md bg-white hover:shadow' onClick={() => downloadImage(ele)}>
              Download
            </button>
            <button className='py-1 px-2 rounded-md shadow-md bg-white hover:shadow' onClick={() => copyAsPng(ele)}>
              Copy as PNG
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
