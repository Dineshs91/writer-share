import Head from 'next/head'
import Editor from '../components/editor'

import { toPng, toBlob } from 'html-to-image';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

function downloadImage(elementRef) {
  toPng(elementRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
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
    <section className='bg-gradient-to-b from-blue-300 to-blue-100 h-screen'>
      <div className='px-2 lg:max-w-3xl lg:mx-auto pt-24'>
        <Toaster/>
        <Head>
          <title>Writer Share</title>
        </Head>
        <div>
          <Editor eleWidth={eleWidth} ele={ele} />
          <div className='mt-12 text-right max-w-[600px] mx-auto flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:justify-end'>
            <button className='py-1 px-2 rounded shadow bg-white hover:shadow hover:shadow-sky-400' onClick={optimizeForTwitter}>
              Optimize for Twitter
            </button>
            <button className='py-1 px-2 rounded shadow bg-white hover:shadow hover:shadow-sky-400' onClick={() => downloadImage(ele)}>
              Download
            </button>
            <button className='py-1 px-2 rounded shadow bg-white hover:shadow hover:shadow-sky-400' onClick={() => copyAsPng(ele)}>
              Copy as PNG
            </button>
          </div>
        </div>
        
      </div>
    </section>
  )
}
