import { useState, createElement } from 'react'
import { useSelector } from 'react-redux'
import { LoadingResult } from '../'
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import {logo} from '../../assets/img/img.js'

const Result = ({items, placeholder, itemLimit, type, isLoading, timeRange}) => {
    const [isSaving, setIsSaving] = useState(false)
    const { profile } = useSelector(state => state.user)


    const createImage = () => {
        setIsSaving(true)
        const node = document.getElementById('image-node')

        node.style.width = "550px"

        toPng(node)
        .then(function (dataUrl) {
            saveAs(dataUrl, 'thallify.png');
            node.style.width = ""
            setIsSaving(false)
        })
        .catch(function (error) {
            setIsSaving(false)
            console.error('oops, something went wrong!', error);
        });
    }

    return (
        <div className="result max-w-xl mx-auto select-none py-4">
        {isSaving ? 
            <div 
                className="btn w-full btn-primary mb-4 drop-shadow-lg loading"
                onClick={createImage}
            >
                Saving
            </div>
        :
            <div 
                className="btn w-full btn-primary mb-4 drop-shadow-lg"
                onClick={createImage}
            >
                <svg className="h-6 w-6 fill-white mr-4" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                Download an image
            </div>
        }
            {isSaving && 
            <div className="cover absolute z-10 bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-xl h-full overflow-hidden drop-shadow-lg"
                style={{
                    height: document.getElementById('image-node') ? document.getElementById('image-node').offsetHeight : 'auto',
                    width: document.getElementById('image-node') ? document.getElementById('image-node').offsetWidth : 'auto',
                }}
                />
            }
            <div id="image-node" className="bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-xl h-full overflow-hidden relative drop-shadow-lg">
                <div className="text-white pb-3">
                    <div className="flex justify-between">
                        <div
                            className="absolute"
                            style={{
                                height: "350px",
                                width: "350px",
                                left: "-100px",
                                bottom: "-100px",
                            }}
                        >
                            {logo}
                        </div>
                        <div className="flex-grow text-end z-10 relative">
                            <p className="text-xm">
                                thallify.com
                            </p>
                            <p className="text-3xl">
                                {profile?.name+"'s"}
                            </p>
                            <p className="text-xl">
                            {type === "Artists" ? 
                                timeRange === "short_term" ?
                                    " Top artists this month" :
                                    timeRange === "medium_term" ?
                                        " Top artists in the last 6 months" :
                                        " Top artists of all time"
                            : timeRange === "short_term" ?
                                " Top tracks this month" :
                                timeRange === "medium_term" ?
                                    " Top tracks in the last 6 months" :
                                    " Top tracks of all time"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col content-center justify-between rounded-xl overflow-hidden drop-shadow-xl">
                    { placeholder || isLoading ? 
                        Array.from({length: itemLimit}, (_, i) => 
                            <LoadingResult key={i} i={i} />
                        )
                    : !isLoading &&
                        items && items.length > 0 && items.slice(0, itemLimit).map((item, i) => (
                            <div key={i} className={`bg-white flex h-20${i !== 0 ? ' border-t border-gray-600' : ''}`}>
                                <div className="bg-gray-100 text-black w-20 h-20 flex justify-center items-center" style={{minWidth: '128px', maxWidth: '128px'}}>
                                    <img
                                        alt="Avatar"
                                        src={type === "Artists" ? item?.images && item?.images[0]?.url : type === "Tracks" ? item?.album?.images && item?.album?.images[0]?.url : ''}
                                        className="object-cover object-center h-full w-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-between text-white flex-grow text-md h-20 pl-2 py-1 bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${type === "Artists" ? item?.images && item?.images[0]?.url : type === "Tracks" ? item?.album?.images&& item?.album?.images[0]?.url : ''})`
                                    }}
                                >
                                    <div className="content-center h-max flex flex-col text-sm">
                                        {type === "Artists" ? 
                                            item.name
                                        : 
                                        <>
                                            <p>{item?.name}</p>
                                            {item?.artists?.length > 0 &&
                                                <p className="opacity-60 text-sm">{item?.artists[0]?.name}</p>
                                            }
                                        </>
                                        }
                                    </div>
                                    <div className="flex flex-col justify-end items-end px-1">
                                        {type === "Artists" ?
                                            item.genres && item.genres.slice(-3).map((genre, i, arr) => (
                                                <div key={`genre-${i}`} className="text-white opacity-60 text-xs capitalize">{ genre }</div>
                                            ))
                                        : 
                                        <p className="text-xs">{item?.album?.name}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Result