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



  return (
    <>
    {profile &&
    <div>
      {/* <div className="pt-4 flex flex-col content-center justify-center">
        <div className="avatar justify-center">
          <div className="w-24 rounded-full">
            <img src={profile.avatar} alt="Avatar" />
          </div>
        </div>
        <h3 className="text-3xl text-center mt-3">{profile.name}</h3>
      </div> */}
      <h5 className="text-4xl text-center pt-5">
        Create your list
      </h5>
      <div class="divider max-w-md mx-auto border-white"/>
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
            onClick={() => setItemLimit(5)}
            label="5"
            secondaryLabel="Items"
            active={itemLimit === 5}
          />
          <RangeItem
            onClick={() => setItemLimit(10)}
            label="10"
            secondaryLabel="Items"
            active={itemLimit === 10}
          />
          <RangeItem
            onClick={() => setItemLimit(20)}
            label="20"
            secondaryLabel="Items"
            active={itemLimit === 20}
          />
        </div>
      </div>
      <div>
        <div className="mt-4 flex content-center justify-between gap-2 max-w-xl mx-auto">
          <RangeItem
            onClick={() => setTimeRange("short_term")}
            label="Short"
            secondaryLabel="Range"
            active={timeRange === "short_term"}
          />
          <RangeItem
            onClick={() => setTimeRange("medium_term")}
            label="Mid"
            secondaryLabel="Range"
            active={timeRange === "medium_term"}
          />
          <RangeItem
            onClick={() => setTimeRange("long_term")}
            label="Long"
            secondaryLabel="Range"
            active={timeRange === "long_term"}
          />
        </div>
      </div>
    </div>
    }
    {item && item.items ?
      <Result
        items={item.items}
      />
      :
      <Result
        placeholder
        itemLimit={itemLimit}
        type={type}
      />
    }
    </>
  )
}

export default Home