import reverseIcon from "../../assets/icons/reverse.svg";
import scheduleIcon from "../../assets/icons/schedule.svg";
import clipboardIcon from "../../assets/icons/clipboard.svg";
import linkIcon from "../../assets/icons/link.svg";
import styles from "./styles.module.css";
import { useState } from "react";
import { DateTime } from "luxon";

import PropTypes from "prop-types";

const Widgets = ({
  onDateChange,
  onTZReverse,
  selectedTimeZones,
  currentDate,
}) => {
  const [linkShowing, setLinkShowing] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [date, setDate] = useState(DateTime.now().toISODate().toString());
  const handleChange = (e) => {
    const newDate = DateTime.fromISO(e.target.value);
    if (newDate.isValid) {
      setDate(newDate.toISODate().toString());
      onDateChange(newDate);
    }
  };

  const getLink = () => {
    const url = new URL(window.location);
    url.searchParams.set("ts", currentDate.toMillis());
    url.searchParams.set("tzs", selectedTimeZones);
    setShareableLink(url.toString());
    setLinkShowing((prev) => !prev);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareableLink);
    setLinkShowing(false);
  };

  return (
    <div className={styles.parentWrapper}>
      <div className={styles.widgetWrapper}>
        <input
          className={styles.dateInput}
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={handleChange}
        />
        <div className={styles.widgetIcon} onClick={onTZReverse}>
          <img src={reverseIcon} alt="" role="button" />
        </div>
        <div className={styles.widgetIcon}>
          <img src={scheduleIcon} alt="" role="button" />
        </div>
        <div className={styles.widgetIcon} onClick={getLink}>
          <img src={linkIcon} alt="" role="button" />
        </div>
      </div>
      {linkShowing && (
        <div className={styles.linkDiv}>
          <div className={styles.linkP}>{shareableLink}</div>
          <div className={styles.widgetIcon} onClick={copyLink}>
            <img src={clipboardIcon} alt="" role="button" />
          </div>
        </div>
      )}
    </div>
  );
};

Widgets.propTypes = {
  onDateChange: PropTypes.func,
  onTZReverse: PropTypes.func,
  selectedTimeZones: PropTypes.array,
  currentDate: PropTypes.instanceOf(DateTime),
};

export default Widgets;
