import { ReactNode, createContext, useContext, useState } from 'react'

type Props = {
  children: ReactNode
}

export type GlobalContent = {
  title: string
  setTitle: (title: string) => void
  status: string
  setStatus: (status: string) => void
  contentType: string
  setContentType: (contentType: string) => void
  projectData: iContentInLandingPage
  setProjectData: (ProjectData: iContentInLandingPage) => void
}

export const GlobalContext = createContext<GlobalContent>({
  title: '',
  setTitle: () => {},
  status: '',
  setStatus: () => {},
  contentType: '',
  setContentType: () => {},
  projectData: {
    projectData: '',
    html: '',
    css: '',
  },
  setProjectData: () => {},
})

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }: Props) => {
  const [projectData, setProjectData] = useState<iContentInLandingPage>({
    projectData: '',
    html: '',
    css: '',
  })
  const [title, setTitle] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [contentType, setContentType] = useState<string>('')

  return (
    <GlobalContext.Provider
      value={{
        title,
        setTitle,
        status,
        setStatus,
        contentType,
        setContentType,
        projectData,
        setProjectData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
