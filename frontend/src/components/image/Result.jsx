const Result = ({items, placeholder, itemLimit, type, isLoading}) => {
    return (
        <div className="result pb-4 max-w-xl mx-auto select-none">
            <div>
                <div className="flex flex-col content-center justify-between rounded-lg overflow-hidden drop-shadow-lg">
                    { placeholder || isLoading ? 
                        Array.from({length: itemLimit}, (_, i) => 
                            <div key={i} className={`bg-white flex${i !== 0 ? ' border-t' : ''}`}>
                                <div className="bg-gray-100 text-black w-20 h-20 flex justify-center items-center text-3xl">
                                </div>
                                <div className="text-black flex-grow text-xl h-20 pl-2 py-1 bg-center bg-cover bg-no-repeat">
                                    <div className="content-center h-max">
                                        {type === "Artists" ? `${i+1}. Artist's loading . . .` : `${i+1}. Track's loading . . .`}
                                    </div>
                                </div>
                            </div>
                        )
                    :
                        items && items.slice(0, itemLimit).map((item, i) => (
                            <div key={i} className={`bg-white flex${i !== 0 ? ' border-t' : ''}`}>
                                <div className="bg-gray-100 text-black w-20 h-20 flex justify-center items-center text-3xl">
                                    <img
                                        alt="Avatar"
                                        src={type === "Artists" ? item.images[2].url : item.album.images[0].url}
                                        className="object-cover object-center h-full w-full"
                                    />
                                </div>
                                <div className="text-black flex-grow text-xl h-20 pl-2 py-1 bg-center bg-cover bg-no-repeat">
                                    <div className="content-center h-max">
                                        {type === "Artists" ? 
                                            i+1+'. '+item.name
                                        : "Track"}
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