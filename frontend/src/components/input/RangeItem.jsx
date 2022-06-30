
const RangeItem = ({label, onClick, active, secondaryLabel}) => {
    return (
        <div 
            className={`py-3 px-2 drop-shadow-lg select-none bg-white font-bold line-h cursor-pointer text-center flex-grow flex flex-col content-center justify-center transition-all rounded active:bg-gray-200 ${active ? "bg-gray-800 text-white" : "text-black"}`}
            onClick={onClick}
        >
            <div className="text-xl m-0 p-0 leading-3">{label}</div>
            <div className="mt-2 text-xs leading-3">{secondaryLabel}</div>
        </div>
    )
}

export default RangeItem