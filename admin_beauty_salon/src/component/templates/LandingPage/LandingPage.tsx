import he from 'he'
import { useParams } from 'react-router-dom'
import { useGetCategory } from '@/hooks/hooks'
import InnerHTML from 'dangerously-set-html-content'

const LandingPage = () => {
  const { id } = useParams()

  const getCategoryApi = useGetCategory(id!)

  const grapesJSData = {
    html: getCategoryApi.data?.message.landingPage.html
      ? he.decode(getCategoryApi.data?.message.landingPage.html)
      : 'Không có dữ liệu...',
    css: getCategoryApi.data?.message.landingPage.css || '',
  }

  if (getCategoryApi.isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <section>
      <style>{grapesJSData.css}</style>
      <InnerHTML html={grapesJSData.html} />
    </section>
  )
}

export default LandingPage
