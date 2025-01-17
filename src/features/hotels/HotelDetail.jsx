import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FiCalendar, FiUsers } from "react-icons/fi";
import {
  FaBed,
  FaBookmark,
  FaLocationArrow,
  FaMoneyBill1Wave,
  FaRegBookmark,
} from "react-icons/fa6";

import Search from "../../ui/Search";
import { getHotelById } from "../../services/apiHotel";
import { useBookmarks } from "../bookmarks/useBookmarks";
import SearchItem from "../../ui/SearchItem";
import { useUpdateBookmark } from "../bookmarks/useUpdateBookmark";
import { formatDate, subtractDates } from "../../helpers/formatDate";
import { createReservation } from "../../services/apiReservations";
import Rating from "../../ui/Rating";
import Location from "../../ui/Location";

function formatTime(time) {
  const [hours, minutes] = time.split(":");

  const formattedHours = hours.padStart(2, "0");

  return `${formattedHours}:${minutes}`;
}

function HotelDetail() {
  const hotel = useLoaderData();
  const { bookmarks } = useBookmarks();
  const { updateBookmark } = useUpdateBookmark();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState({});

  const navigate = useNavigate();

  function handleCheckInDateChange(date) {
    setCheckInDate(formatDate(date));
  }

  function handleCheckOutDateChange(date) {
    setCheckOutDate(formatDate(date));
  }

  function handleGuestsChange(newGuests) {
    setGuests(newGuests);
  }

  function handleRoomsChange(newRooms) {
    setRooms(newRooms);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const roomLength = Object.values(rooms).reduce((acc, cur) => acc + cur, 0);

    if (
      checkInDate &&
      checkOutDate &&
      roomLength &&
      subtractDates(checkInDate, checkOutDate) > 0
    ) {
      const newReservation = {
        createdAt: new Date().toISOString(),
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        rooms,
        guests,
        hotelId: hotel.id,
      };

      await createReservation(newReservation);
      navigate("/app/reservations");
    }
  }

  return (
    <main className="px-14 py-14 md:px-16 md:py-16">
      <Search />

      <div className="fvc mx-auto mt-16 flex-col">
        <img src={hotel.image} alt={hotel.name} className="w-[44rem]" />

        <div className="mt-8 flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-col gap-4">
            <div className="rounded-md border p-8 shadow-sm">
              <div className="fvc justify-between">
                <h1 className="text-3xl font-medium text-slate-800 dark:text-slate-200">
                  {hotel.name}
                </h1>
                <button
                  className="cursor-pointer"
                  onClick={() => updateBookmark(hotel.id)}
                >
                  {bookmarks?.some(
                    (bookmark) => bookmark.hotelId === hotel.id,
                  ) ? (
                    <FaBookmark className="text-xl text-violet-500" />
                  ) : (
                    <FaRegBookmark className="text-xl dark:text-slate-50" />
                  )}
                </button>
              </div>

              <div className="mb-2 mt-2 flex gap-3">
                <Rating rating={hotel.rating} />
                <Location city={hotel.city} country={hotel.country} />
              </div>

              <div className="mb-6 mt-4 h-[1px] w-full bg-slate-300 dark:bg-slate-700"></div>

              <p className="text-base font-normal text-slate-800 dark:text-slate-200">
                {hotel.description}
              </p>

              <div className="fvc mt-6 gap-2 text-base text-slate-800 dark:text-slate-200">
                <FaBed className="text-violet-600 dark:text-violet-400" />
                <span className="font-medium">Available Room: </span>
                {hotel.available_rooms} rooms
              </div>

              <div className="fvc mt-2 gap-2 text-base text-slate-800 dark:text-slate-200">
                <FaMoneyBill1Wave className="text-violet-600 dark:text-violet-400" />
                <span className="font-medium">Base Price: </span>$
                {hotel.base_price}
              </div>

              <div className="fvc mt-7 gap-1 text-base text-zinc-600 dark:text-zinc-400">
                <FaLocationArrow />
                <span className="border-b border-b-slate-800">
                  {hotel.address}
                </span>
              </div>
            </div>

            <div className="rounded-md border p-8 shadow-sm">
              <h2 className="text-xl text-slate-800 dark:text-slate-200">
                Space & Rooms
              </h2>

              <div className="mb-6 mt-4 h-[1px] w-full bg-slate-300 dark:bg-slate-700"></div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {Object.entries(hotel.room_types).map(([roomType, details]) => (
                  <div
                    className="rounded-md border p-4 shadow-sm"
                    key={roomType}
                  >
                    <h3 className="text-lg text-slate-800 dark:text-slate-200">
                      {roomType}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      ${details.price} each room
                    </p>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {details.capacity} room left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex basis-1/3 flex-col gap-4">
            <div className="flex gap-8 rounded-md border p-8 text-slate-800 shadow-sm lg:justify-between dark:text-slate-200">
              <div>
                <h3 className="font-medium">Check-in:</h3>
                <p>{`${formatTime(hotel.check_in_time)}`}</p>
              </div>

              <div>
                <h3 className="font-medium">Check-out:</h3>
                <p>{`${formatTime(hotel.check_out_time)}`}</p>
              </div>
            </div>

            <div className="rounded-md border p-8 shadow-sm">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <SearchItem
                    fieldName="Check in"
                    placeholder="Select check-in day"
                    fieldIcon={<FiCalendar className="h-6 w-6 text-lg" />}
                    value={checkInDate}
                    onChange={handleCheckInDateChange}
                    type="date"
                  />

                  <SearchItem
                    fieldName="Check out"
                    placeholder="Select check-out day"
                    fieldIcon={<FiCalendar className="h-6 w-6 text-lg" />}
                    value={checkOutDate}
                    onChange={handleCheckOutDateChange}
                    type="date"
                  />

                  <SearchItem
                    fieldName="Guests"
                    placeholder="1 Guests"
                    fieldIcon={<FiUsers className="h-6 w-6 text-lg" />}
                    value={guests}
                    onChange={handleGuestsChange}
                    type="guest"
                  />

                  <SearchItem
                    fieldName="Rooms"
                    placeholder="Choose room type"
                    fieldIcon={<FiUsers className="h-6 w-6 text-lg" />}
                    value={rooms}
                    onChange={handleRoomsChange}
                    type="room"
                    hotel={hotel}
                  />
                </div>

                <button className="rounded-md bg-violet-600 py-3 text-lg font-medium text-slate-200 dark:bg-violet-400 dark:text-slate-800">
                  Reserve
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function loader({ params }) {
  const hotel = await getHotelById(params.hotelId);

  return hotel;
}

export default HotelDetail;
