import Head from 'next/head'
import Editor from '../components/editor'

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useRef } from 'react';

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

export default function Home() {
  let ele = useRef()

  return (
    <div className='lg:max-w-2xl lg:mx-auto mt-24'>
      <Head>
        <title>Writer Share</title>
      </Head>
      <div className='mx-auto'>
        <Editor ele={ele} />
      </div>
      <div className='text-right'>
        <button onClick={() => downloadImage(ele)}>
          Download
        </button>
      </div>
    </div>
  )
}
