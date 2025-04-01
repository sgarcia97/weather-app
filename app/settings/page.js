'use client'
import PageTemplate from "../components/PageTemplate"
import Img from "../../public/globe.svg"
import Setting from "../components/Setting"
import Spacer from "../components/Spacer"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  return (
    <>
      <PageTemplate title="User Settings">
        <Spacer/>
        <Setting onclick={()=>router.push('/favourites')} name="Your saved locations" img={Img}/>
        <Setting name="Logout" img={Img}/>
      </PageTemplate>
    </>
  )
}

export default Page
