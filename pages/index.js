import Head from 'next/head'
import Editor from '../components/editor'

import { toPng, toBlob } from 'html-to-image';
import { useRef } from 'react';
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
            toast.success('Copied png image to clipboard')
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

  return (
    <section className='bg-gray-800 h-screen'>
      <div className='px-2 lg:max-w-3xl lg:mx-auto pt-24'>
        <Toaster/>
        <Head>
          <title>Writer Share</title>
        </Head>
        <div>
          <Editor ele={ele} />
          <div className='text-right space-x-4 max-w-[600px] mx-auto'>
            <button className='px-2 border rounded bg-white' onClick={() => downloadImage(ele)}>
              Download
            </button>
            <button className='px-2 border rounded bg-white' onClick={() => copyAsPng(ele)}>
              Copy as PNG
            </button>
          </div>
        </div>
        
      </div>
    </section>
  )
}
