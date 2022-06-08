import Head from 'next/head'

export default function Font(props) {
  const fontFamilies = [props.fontFamily]
  const googleFontFamilies = fontFamilies
    .map((font) => font.replace(/ /g, '+'))
    .map((font) => `family=${font}`)
    .join('&')
  const googleFontsLink = `https://fonts.googleapis.com/css?${googleFontFamilies}&display=swap`

  return (
    <Head>
      <link rel='stylesheet' href={googleFontsLink} crossOrigin='anonymous' />
    </Head>
  )
}
