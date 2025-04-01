import PageTemplate from "../components/PageTemplate"
import Favourite from "../components/Favourite"
import Spacer from "../components/Spacer"

const Page = () => {

  return (
      <PageTemplate title="Your Favourites">
      <Spacer/>
      <Favourite name="Calgary" country="Canada"/>
      <Favourite name="Winnipeg" country="Manitoba"/>
      <Favourite name="Port-of-Spain" country="Trinidad and Tobago"/>
      <Favourite name="Manila" country="Phillipines"/>
      </PageTemplate>
  )
}

export default Page
