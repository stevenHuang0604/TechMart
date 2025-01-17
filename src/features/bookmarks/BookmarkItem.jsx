import { Link } from "react-router-dom";
import {
  FaBed,
  FaBookmark,
  FaLocationArrow,
  FaMoneyBill1Wave,
} from "react-icons/fa6";

import { useUpdateBookmark } from "./useUpdateBookmark";
import Rating from "../../ui/Rating";
import Location from "../../ui/Location";

function BookmarkItem({ bookmark }) {
  const { updateBookmark } = useUpdateBookmark();
  const hotel = bookmark.hotels;

  return (
    <div className="flex flex-col overflow-hidden rounded-md border shadow-sm dark:shadow-slate-400/50">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="h-60 w-full object-cover"
      />

      <div className="flex grow flex-col p-6 pt-4">
        <span className="text-xs text-slate-400 dark:text-slate-600">
          {hotel.price_range}
        </span>

        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-medium text-slate-800 dark:text-slate-200">
            {hotel.name}
          </h1>
          <button
            className="cursor-pointer pt-2"
            onClick={() => updateBookmark(hotel.id)}
          >
            <FaBookmark className="text-xl text-violet-500" />
          </button>
        </div>

        <div className="mb-2 mt-2 flex gap-3">
          <Rating rating={hotel.rating} />
          <Location city={hotel.city} country={hotel.country} />
        </div>

        <div className="mb-3 mt-1 h-[1px] w-full bg-slate-300 dark:bg-slate-700"></div>

        <p className="text-base font-normal text-slate-800 dark:text-slate-200">
          {hotel.description}
        </p>

        <div className="fvc mt-4 gap-2 text-sm text-slate-800 dark:text-slate-200">
          <FaBed className="text-violet-600 dark:text-violet-400" />
          <span className="font-medium">Available Room: </span>
          {hotel.available_rooms} rooms
        </div>

        <div className="fvc mt-2 gap-2 text-sm text-slate-800 dark:text-slate-200">
          <FaMoneyBill1Wave className="text-violet-600 dark:text-violet-400" />
          <span className="font-medium">Base Price: </span>${hotel.base_price}
        </div>

        <div className="mb-auto mt-5 flex items-center gap-1 pb-4 text-sm text-zinc-600 dark:text-zinc-400">
          <FaLocationArrow />
          <span className="border-b border-b-slate-800">{hotel.address}</span>
        </div>
        <Link
          to={`/app/hotels/${hotel.id}`}
          className="rounded-md bg-violet-600 px-4 py-2 text-center font-medium text-slate-50 dark:bg-violet-400 dark:text-slate-950"
        >
          Check details
        </Link>
      </div>
    </div>
  );
}

export default BookmarkItem;
