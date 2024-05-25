import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import DnDWrapper from "../../components/DnDWrapper";
import Timezones from "../../components/TimeZones";
import Widgets from "../../components/Widgets";

import { luxonValidTimezones } from "../../utils/helpers";

import styles from "./style.module.css";

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(
    DateTime.now().setLocale("en-IN")
  );
  const [selectedTimeZones, setSelectedTimeZones] = useState([
    "Asia/Kolkata",
    "UTC",
  ]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getData = setTimeout(() => {
      const value = luxonValidTimezones.filter(
        (item) =>
          search.length > 0 && item.toLowerCase().includes(search.toLowerCase())
      );

      if (value) {
        setSearchResult(value);
      }
    }, 500);
    return () => clearTimeout(getData);
  }, [search]);

  /* Get values from public url and update the states */
  useEffect(() => {
    const url = new URL(window.location);
    const timezones = url.searchParams.get("tzs");
    const timestamp = url.searchParams.get("ts");
    if (timezones) {
      setSelectedTimeZones(timezones.split(","));
    }

    if (timestamp) {
      setCurrentDate(
        DateTime.fromMillis(parseInt(timestamp)).setLocale("en-IN")
      );
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  
  const reverseOrder = () => {
    const tzs = [...selectedTimeZones].reverse();
    setSelectedTimeZones(tzs);
  };
  
  const onSliderChange = (mins, timezone) => {
    setCurrentDate((p) =>
      p.setZone(timezone).set({ hour: parseInt(mins / 60), minute: mins % 60 })
    );
  };

  const addTimeZone = (tz) => {
    setSelectedTimeZones((prevTz) => [...prevTz, tz.split(" ")[0]]);
    setSearchResult([]);
    setSearch("");
  };

  const removeTimezone = (tz) => {
    setSelectedTimeZones((prevTz) => prevTz.filter((pTz) => pTz !== tz));
  };

  const changeDate = (date) => {
    const updatedDate = date
      .set({
        hour: currentDate.hour,
        minute: currentDate.minute,
        second: currentDate.second,
      })
      .setLocale("en-IN");
    setCurrentDate(updatedDate);
  };

  return (
    <main className={styles.mainContainer}>
      <Widgets
        onDateChange={changeDate}
        onTZReverse={reverseOrder}
        selectedTimeZones={selectedTimeZones}
        currentDate={currentDate}
      />
      <div className={styles.searchDiv}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search Timezones"
          value={search}
          onChange={handleSearchChange}
        />
        {searchResult.length > 0 && (
          <ul className={styles.searchResultList}>
            {searchResult.map((i) => (
              <li key={i} onClick={() => addTimeZone(i)}>
                {i}
              </li>
            ))}
          </ul>
        )}
      </div>

      <DnDWrapper
        selectedTimeZones={selectedTimeZones}
        setSelectedTimeZones={setSelectedTimeZones}
      >
        {selectedTimeZones.map((tz, i) => (
          <Timezones
            key={tz + i}
            localDate={currentDate}
            onSliderChange={onSliderChange}
            timezone={tz}
            removeTimezone={removeTimezone}
          />
        ))}
      </DnDWrapper>
    </main>
  );
};
export default HomePage;
