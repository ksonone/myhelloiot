/*
MYHELLOIOT
Copyright (C) 2021 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from "react";
import { padvalue } from "./svgdraw";
import Sections, { Section } from "./Sections";
import "./DialGauge.css";

// const sectionstest: Section[] = [
//   {
//     start: -10,
//     end: 40,
//     len: 45,
//     style: {
//       strokeWidth: 10,
//       strokeLinecap: "butt",
//       stroke: "blue",
//       fill: "#00000000",
//     },
//   },
//   {
//     start: 40,
//     end: 60,
//     len: 45,
//     style: {
//       strokeWidth: 10,
//       strokeLinecap: "butt",
//       stroke: "lightgreen",
//       fill: "#00000000",
//     },
//   },
// ];

export type DialGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  labelstep?: number;
  sections?: Section[];
};

const DialGauge: React.FC<DialGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  step = 5,
  labelstep = 10,
  sections = [],
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  let width: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    width = NaN;
    formatvalue = "";
  } else {
    width = padvalue(min, max, 160)(value);
    formatvalue = intlvalue.format(value);
  }

  const lines = [];
  for (let index = min; index <= max; index += step) {
    const mark = 20 + (160 * (index - min)) / (max - min);
    lines.push(
      <line
        key={`la-${index}`}
        x1={mark}
        y1={36}
        x2={mark}
        y2={54}
        className="dial-indicator-mark"
      />
    );
  }

  for (let index = min; index <= max; index += labelstep) {
    const mark = 20 + (160 * (index - min)) / (max - min);
    lines.push(
      <line
        key={`lb-${index}`}
        x1={mark}
        y1={30}
        x2={mark}
        y2={60}
        className="dial-indicator-markstep"
      />
    );
    lines.push(
      <text
        key={`t-${index}`}
        x={mark}
        y={70}
        textAnchor="middle"
        className="dial-indicator-marklabel"
      >
        {intl.format(index)}
      </text>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 90"
      className={className}
    >
      <line
        x1={20}
        y1={45}
        x2={180}
        y2={45}
        className="dial-indicator-background"
      />
      <Sections sections={sections} min={min} max={max} start={20} len={160} />
      {lines}
      {!isNaN(width) && (
        <line
          x1={20}
          y1={45}
          x2={180}
          y2={45}
          className="dial-indicator-bar"
          style={{
            fill: "#00000000",
            strokeMiterlimit: 0,
            strokeDasharray: `${width} 400`,
          }}
        />
      )}
      <text x={180} y={20} textAnchor="end" className="dial-indicator-value">
        {formatvalue}
      </text>
      <text x={20} y={20} textAnchor="start" className="dial-indicator-title">
        {title}
      </text>
    </svg>
  );
};

export default DialGauge;
