import { LoadingResult } from '../'

const Result = ({items, placeholder, itemLimit, type, isLoading}) => {
    return (
        <div className="result max-w-xl mx-auto select-none py-4">
            <div>
                <div className="flex flex-col content-center justify-between rounded-lg overflow-hidden drop-shadow-lg">
                    { placeholder || isLoading ? 
                        Array.from({length: itemLimit}, (_, i) => 
                            <LoadingResult key={i} i={i} />
                        )
                    :
                        items && items.slice(0, itemLimit).map((item, i) => (
                            <div key={i} className={`bg-white flex h-32${i !== 0 ? ' border-t' : ''}`}>
                                <div className="bg-gray-100 text-black w-32 h-32 flex justify-center items-center text-3xl" style={{minWidth: '128px'}}>
                                    <img
                                        alt="Avatar"
                                        src={type === "Artists" ? item.images[2].url : item.album.images[0].url}
                                        className="object-cover object-center h-full w-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-between text-white flex-grow text-xl h-32 pl-2 py-1 bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${type === "Artists" ? item.images[0].url : item.album.images[0].url})`
                                    }}
                                >
                                    <div className="content-center h-max flex">
                                        {type === "Artists" ? 
                                            item.name
                                        : "Track"}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {type === "Artists" ?
                                            item.genres.slice(-2).map((genre, i, arr) => (
                                                <div key={`genre-${i}`} className="text-white badge badge-outline mr-1 mb-1 text-xs capitalize">{ genre }</div>
                                            ))
                                        : null }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="btn w-full btn-primary mt-4 drop-shadow-lg">
                    <svg className="h-6 w-6 fill-white mr-4" viewBox="0 0 16 16">
                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                    </svg>
                    Share this list
                </div>
            </div>
        </div>
    )
}

export default Result