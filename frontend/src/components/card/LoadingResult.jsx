import { Skeleton } from '../'


const LoadingResult = ({i}) => {
    return (
        <div className={`bg-white flex${i !== 0 ? ' border-t' : ''}`}>
            <Skeleton 
                className="bg-gray-100 text-black flex justify-center items-center text-3xl"
                width="80"
                height="80"
                animation="wave"
            />
            <div className="text-black flex-grow text-xl h-20 pl-2 py-1 bg-center bg-cover bg-no-repeat flex flex-col justify-between">
                <Skeleton 
                    className="content-center h-max rounded"
                    width="150"
                    type="text"
                    animation="wave"
                />
                <div className="flex mt-3">
                    <Skeleton 
                        className="content-center h-max rounded mr-3"
                        width="50"
                        type="text"
                        animation="wave"
                    />
                    <Skeleton 
                        className="content-center h-max rounded mr-3"
                        width="50"
                        type="text"
                        animation="wave"
                    />
                </div>
            </div>
        </div>
    )
}

export default LoadingResult