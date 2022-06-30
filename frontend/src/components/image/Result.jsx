const Result = ({items, placeholder, itemLimit, type}) => {
    return (
        <div className="result">
            <div className="mt-4">
                {placeholder &&
                <div className="btn w-full btn-primary mb-4 drop-shadow-lg">
                    <svg className="h-6 w-6 fill-white mr-2" viewBox="0 0 16 16">
                        <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z"/>
                    </svg>
                    Create your list
                </div>}
                <div className="flex flex-col content-center justify-between max-w-xl mx-auto bg-slate-800 rounded-lg overflow-hidden drop-shadow-lg">
                    { placeholder ? 
                        Array.from({length: itemLimit}, (_, i) => 
                            <div key={i} className={`w-full bg-white flex${i !== 0 ? ' border-t' : ''}`}>
                                <div className="bg-gray-800 w-20 h-20 flex justify-center items-center text-3xl">
                                    {i + 1}
                                </div>
                                <div className="text-black w-full text-3xl flex h-20 items-center pl-2">
                                    <div className="content-center h-max">
                                        {type === "Artists" ? "Artist" : "Track"}
                                    </div>
                                </div>
                            </div>
                        )
                    : null}
                </div>
            </div>
        </div>
    )
}

export default Result