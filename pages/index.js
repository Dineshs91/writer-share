import Head from 'next/head'
import Editor from '../components/editor'

import { toPng, toBlob } from 'html-to-image';
import { useRef, useState, useEffect } from 'react';
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
  const illustrations = [
    "/images/diary-bro.svg",
    "/images/blogging-pana.svg",
    "/images/notes-amico.svg"
  ]

  let [eleWidth, setEleWidth] = useState('inherit')
  let [pickerOpen, setPickerOpen] = useState(false)
  let [bgColor, setBgColor] = useState('white')
  let [currentIllustration, setCurrentIllustration] = useState(0)

  useEffect(() => {
    setInterval(() => {
      let index = currentIllustration + 1
      if (index > 2) {
        index = 0
      }
      setCurrentIllustration(index)
    }, 10000)
  }, [])

  const togglePicker = () => {
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

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPickerOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <section className='main h-screen bg-[#ffeccc]'>
      <div className='px-2 lg:max-w-3xl lg:mx-auto pt-24'>
        <Toaster/>
        <Head>
          <title>Writer Share</title>
        </Head>
        <div>
          <Editor bgColor={bgColor} eleWidth={eleWidth} ele={ele} />
          <div className='mt-12 text-right max-w-[600px] mx-auto flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:justify-end'>
            <button ref={wrapperRef} onClick={togglePicker} className='relative p-2 outline-none bg-white shadow-md rounded-full hover:shadow'>
              <ColorSwatchIcon className='w-4 h-4 fill-orange-300 stroke-orange-800' />
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

      <img className={'absolute w-52 h-auto bottom-10 right-10 ease-in-out transition-opacity delay-1000 ' + (currentIllustration !== 0 ? "opacity-0": "opacity-100")} src={illustrations[0]} />
      <img className={'absolute w-52 h-auto bottom-10 right-10 ease-in-out transition-opacity delay-1000 ' + (currentIllustration !== 1 ? "opacity-0": "opacity-100")} src={illustrations[1]} />
      <img className={'absolute w-52 h-auto bottom-10 right-10 ease-in-out transition-opacity delay-1000 ' + (currentIllustration !== 2 ? "opacity-0": "opacity-100")} src={illustrations[2]} />

      <footer className='absolute bottom-0 w-full'>
        <div className='text-center my-2 text-gray-700 text-sm'>
          Built by <a className='underline' href="https://twitter.com/SDinesh91">@SDinesh91</a>
        </div>
        <div className='text-xs my-1 text-center text-gray-500'>
          <a href="https://storyset.com/work">Work illustrations by Storyset</a>
        </div>
      </footer>
    </section>
  )
}
