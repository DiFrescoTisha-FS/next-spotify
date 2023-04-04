import Image from 'next/image';
import logo from '../public/logo.png'
import Searchbar from './Searchbar';

function Nav() {
    return (
      <div>
        <nav className="flex flex-wrap fixed top-0 z-50 w-full bg-[#1DB954] justify-between py-4 md:py-0 px 4">
          <div className="flex ">
          <Image className="m-5 w-32" src={logo} alt="spotify logo" />
          <h1 className="tracking-widest text-white font-bold mt-4 ml-4 text-lg">SPOTIFY</h1>
        </div>
        <button className="bg-[#18d860] text-white p-5 rounded-lg"
          onClick={() => signIn(provider.id, { callbackUrl: "/login" })}
          >
            Login with {provider.name}
          </button>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14">
              <div className="">
                <Searchbar />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  export default Nav;