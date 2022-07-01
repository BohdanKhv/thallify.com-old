import { useSelector } from "react-redux"
import { Skeleton } from '../'


const Profile = () => {
    const { profile, isLoading } = useSelector(state => state.user)

    return (
        profile ? 
        <div className="pt-4 flex content-center justify-between">
            <div className="flex flex-col">
                <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={profile.avatar} alt="Avatar" />
                </div>
                </div>
                <h3 className="text-2xl text-white text-center mt-1 font-normal">{profile.name}</h3>
            </div>
            <button className="btn btn-ghost btn-circle">
                <svg className="h-6 w-6 fill-white" viewBox="0 0 16 16"
                onClick={() => {
                    localStorage.removeItem("user")
                    localStorage.removeItem("profile")
                    window.location.reload()
                }}
                >
                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                </svg>
            </button>
        </div>
        : isLoading ?
            <div className="pt-4 flex content-center justify-between">
                <div className="flex flex-col">
                    <Skeleton
                        width="96"
                        height="96"
                        animation="wave"
                        type="circular"
                    />
                    <Skeleton
                        height="25"
                        className="rounded mt-2"
                    />
                </div>
            </div>
        : null
    )
}

export default Profile