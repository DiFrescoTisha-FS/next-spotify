// import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Center from '../components/center'
export default function Home() {
  return (
    <div className="bg-black h-screen overfolw-hidden">
        <main className="flex">
        <Sidebar />
          {/* <Nav /> */}
          <Center />
        </main>


      <div>
        {/* Player */}
      </div>
      </div>
  )
}


