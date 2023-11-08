import { useGetCategory } from '@/hooks/hooks'
import { useParams } from 'react-router-dom'
import he from 'he'
import { useEffect } from 'react'

const LandingPage = () => {
  const { id } = useParams()

  const getCategoryApi = useGetCategory(id!)

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.innerHTML = getCategoryApi.data?.message.landingPage.css

    const htmlElement = document.querySelector('.landing-page')
    if (htmlElement) {
      htmlElement.appendChild(styleElement)
    }
  }, [getCategoryApi.data?.message.landingPage.css])

  if (getCategoryApi.isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <section
      className='landing-page'
      dangerouslySetInnerHTML={{
        __html: getCategoryApi.data?.message.landingPage.html
          ? he.decode(getCategoryApi.data?.message.landingPage.html)
          : 'Không có dữ liệu...',
      }}
    ></section>
  )
}

export default LandingPage
