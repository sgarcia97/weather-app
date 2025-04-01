import PageTemplate from "../components/PageTemplate"
import Setting from "../components/Setting"
import Spacer from "../components/Spacer"

const Page = () => {
  return (
    <>
      <PageTemplate title="Your Settings">
        <Spacer/>
        <Setting name="Your saved locations"/>
        <Setting name="Logout"/>
      </PageTemplate>
    </>
  )
}

export default Page
