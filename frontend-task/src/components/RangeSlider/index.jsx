import PropTypes from 'prop-types'

import styles from "./style.module.css";

const RangeSlider = ({ value, onChange, onClick }) => {
  return (
    <div style={{ width: "100%", padding: "0.5rem" }} onClick={onClick}>
      <input
        className={styles.slider}
        type="range"
        min={0}
        max={1440}
        step={30}
        value={value}
        onChange={onChange}
        list="values"
      />
      <datalist id="values" className={styles.dataList}>
        <option value="0" label="12am"></option>
        <option value="180" label=""></option>
        <option value="360" label="6am"></option>
        <option value="540" label=""></option>
        <option value="720" label="12pm"></option>
        <option value="900" label=""></option>
        <option value="1080" label="6pm"></option>
        <option value="1260" label=""></option>
        <option value="1440" label="12am"></option>
      </datalist>
    </div>
  );
};

RangeSlider.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default RangeSlider;
