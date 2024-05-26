import { useCallback, useEffect, useRef, useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DateTime } from "luxon";
import PropType from "prop-types";

import RangeSlider from "../RangeSlider";

import CloseIcon from "../../assets/icons/close.svg?react";

import styles from "./styles.module.css";

const Timezones = ({ localDate, onSliderChange, timezone, removeTimezone }) => {
  const date = localDate.setZone(timezone).setLocale("en-IN");

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: timezone });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const isSliderActive = useRef(false);
  const isInputActive = useRef(false);
  const getMinutes = useCallback((date) => date.hour * 60 + date.minute, []);

  const [sliderValue, setSliderValue] = useState(() => getMinutes(date));
  const [timeInput, setTimeInput] = useState(() =>
    date.toLocaleString(DateTime.TIME_SIMPLE)
  );

  useEffect(() => {
    /* Prevent effect from updating the values if the slider is active */
    if (!isSliderActive.current) {
      setSliderValue(getMinutes(date));
    }

    /* Prevent effect to update the input values if the input is being changed */
    if (!isInputActive.current) {
      setTimeInput(date.toLocaleString(DateTime.TIME_SIMPLE));
    }
  }, [date, getMinutes]);

  const handleSliderChange = (e) => {
    isSliderActive.current = true;
    const mins = parseInt(e.target.value);
    setSliderValue(mins);
    onSliderChange(mins, timezone);
  };

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
    console.log(e.target.value);
    const newDate = DateTime.fromFormat(e.target.value, "t", {
      zone: timezone,
      locale: "en-IN",
      setZone: true,
    });
    if (newDate.isValid) {
      console.log(newDate.isValid);
      onSliderChange(getMinutes(newDate), timezone);
      setTimeInput(newDate.toLocaleString(DateTime.TIME_SIMPLE));
    }
  };

  if (date.invalid) return;

  return (
    <div className={styles.wrapper} style={style}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={styles.dragHandle}
      ></div>
      <div className={styles.contentWrapper}>
        <div className={styles.topContent}>
          <div className={styles.contentDiv}>
            <h1 className={styles.zoneName}>{timezone}</h1>
            <p>{date.offsetNameLong}</p>
          </div>
          <div className={styles.contentDiv}>
            <input
              className={styles.zoneTime}
              type="text"
              value={timeInput}
              onChange={handleTimeChange}
              onFocus={() => {
                isInputActive.current = true;
              }}
              onBlur={() => {
                isInputActive.current = false;
              }}
            />
            <p>{date.toLocaleString(DateTime.DATE_MED)}</p>
          </div>
          <CloseIcon
            className={styles.closeIcon}
            onClick={() => removeTimezone(timezone)}
            role="button"
          />
        </div>
        <RangeSlider
          onClick={() => {
            isSliderActive.current = false;
          }}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

Timezones.propTypes = {
  localDate: PropType.instanceOf(DateTime),
  onSliderChange: PropType.func,
  timezone: PropType.string,
  removeTimezone: PropType.func,
};

export default Timezones;
