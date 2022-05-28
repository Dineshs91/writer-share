import Head from 'next/head'
import Editor from '../components/editor'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Writer Share</title>
      </Head>
      <div className='max-w-2xl mx-auto mt-24'>
        <Editor />
      </div>
    </div>
  )
}
