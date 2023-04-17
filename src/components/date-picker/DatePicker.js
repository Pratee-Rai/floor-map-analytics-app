import { useCallback, useRef, useState } from "react";
import dateIcon from "../../images/icons/date-picker.svg";
import dateStyles from "./date-picker.module.css";
export default function DatePicker(props) {
  return (
    <div className={dateStyles.datePicker + " date-picker"}>
      <input {...props} className={dateStyles.typeText} type="text" />
      <img src={dateIcon} alt="date-picker-icon" width={20} />
    </div>
  );
}
