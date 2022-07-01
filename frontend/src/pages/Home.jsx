import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createList } from "../features/list/listSlice"
import { RangeItem, Result } from "../components"


const Home = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.user)
  const { item, isLoading, isError } = useSelector(state => state.list)
  const [itemLimit, setItemLimit] = useState(10)
  const [timeRange, setTimeRange] = useState("short_term")
  const [type, setType] = useState("Artists")

  
  useEffect(() => {
    const data = {
      spotifyId: profile.id,
      timeRange: timeRange,
      type: type
    }
    const promise = dispatch(createList(data))

    return () => {
      promise.abort()
    }
  }, [timeRange, type, dispatch, profile])

  return (
    <>
    {profile &&
    <div className="p-4">
      {/* <div className="pt-4 flex flex-col content-center justify-center">
        <div className="avatar justify-center">
          <div className="w-24 rounded-full">
            <img src={profile.avatar} alt="Avatar" />
          </div>
        </div>
        <h3 className="text-3xl text-center mt-3">{profile.name}</h3>
      </div> */}
      {/* <h5 className="text-4xl text-center pt-5">
        Create your list
      </h5>
      <div className="divider max-w-md mx-auto border-white"/> */}
      <div>
        <div className="mt-4 flex content-center justify-between gap-2 max-w-xl mx-auto">
          <RangeItem
            onClick={() => setType("Artists")}
            label="Artists"
            secondaryLabel="List"
            active={type === "Artists"}
          />
          <RangeItem
            onClick={() => setType("Tracks")}
            label="Tracks"
            secondaryLabel="List"
            active={type === "Tracks"}
          />
        </div>
      </div>
      <div>
        <div className="mt-4 flex content-center justify-between gap-2 max-w-xl mx-auto">
          <RangeItem
            onClick={() => setTimeRange("short_term")}
            label="~1 Month"
            secondaryLabel="Range"
            active={timeRange === "short_term"}
          />
          <RangeItem
            onClick={() => setTimeRange("medium_term")}
            label="~6 Months"
            secondaryLabel="Range"
            active={timeRange === "medium_term"}
          />
          <RangeItem
            onClick={() => setTimeRange("long_term")}
            label="Overall"
            secondaryLabel="Range"
            active={timeRange === "long_term"}
          />
        </div>
      </div>
      <div className="p-4 bg-white border-1 border-xl max-w-xl mx-auto rounded mt-4">
        <div className="flex content-center justify-between text-xl text-black mb-2">
          <h5>
            List length
          </h5>
          <h5>
            {itemLimit}
          </h5>
        </div>
        <input type="range" min="5" max="50" value={itemLimit} onChange={(e) => setItemLimit(e.target.value)} className="range range-primary" step="1" />
          <div className="w-full flex justify-between text-xs px-2">
            <span>5</span>
            <span>|</span>
            <span>27</span>
            <span>|</span>
            <span>50</span>
          </div>
      </div>
    </div>
    }
    {item && item.items ?
      <Result
        items={item.items}
        itemLimit={itemLimit}
        type={type}
        isLoading={isLoading}
      />
    :
      <Result
        placeholder
        itemLimit={itemLimit}
        type={type}
        isLoading={isLoading}
      />
      }
    </>
  )
}

export default Home