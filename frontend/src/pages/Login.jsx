import { SpotifyLogin } from './';
import { thallifyImg, logo } from '../assets/img/img';

const Login = () => {
    return (
        <>
        <div className="absolute z-0 overflow-visible"
            style={{
                width: '400px',
                height: '400px',
                top: '-200px',
                left: '-200px',
            }}
        >
            {logo}
        </div>
        <img
            src={thallifyImg}
            alt="thallify.com"
            style={{
                height: '50vh',
            }}
            className="absolute bottom-2 -right-20 z-0 object-cover object-center backdrop-brightness-50 rounded-xl drop-shadow-2xl"
        />
        <div className="container mx-auto h-screen z-20 relative max-w-xl text-center overflow-x-hidden px-4">
            <div className="flex justify-center flex-col flex-grow z-20 mt-40">
                <h1 className="text-5xl text-white">
                    Create snapshot of your top tracks or artists
                </h1>
                <h5 className="text-1xl text-white mt-6">
                    Share it with your friends on social media and find out who is listening to the same music as you!
                </h5>
                <div className="mt-6">
                    <SpotifyLogin />
                </div>
            </div>
        </div>
        </>
    )
}

export default Login