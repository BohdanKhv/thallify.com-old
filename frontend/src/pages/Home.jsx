import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createList, resetList } from "../features/list/listSlice"
import { RangeItem, Result, Profile } from "../components"


const Home = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.user)
  const { item, isLoading } = useSelector(state => state.list)
  const [itemLimit, setItemLimit] = useState(5)
  const [timeRange, setTimeRange] = useState("short_term")
  const [type, setType] = useState("Artists")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let promise = null
  
    if (profile) {
      const data = {
        spotifyId: profile.id,
        timeRange: timeRange,
        type: type
      }
      promise = dispatch(createList(data))
    }

    return () => {
      promise && promise.abort()
      dispatch(resetList())
    }
  }, [timeRange, type, dispatch, profile])

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Profile/>
      <div>
        <div className="mt-4 flex content-center justify-between gap-2">
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
        <div className="mt-4 flex content-center justify-between gap-2">
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
      <div className="p-4 bg-white border-1 border-xl rounded mt-4">
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
    {item && item.items ?
      <Result
        items={item.items}
        itemLimit={itemLimit}
        type={type}
        isLoading={isLoading}
        timeRange={timeRange}
      />
    :
      <Result
        placeholder
        itemLimit={itemLimit}
        type={type}
        isLoading={isLoading}
      />
      }
    </div>
  )
}

export default Home