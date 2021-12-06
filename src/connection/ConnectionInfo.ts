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

import { FileInfo } from "./UploadRaw";
import { cyrb53str } from "./CryptFunctions";
import basicsampledata from "./basicsampledata";

export type ConnectInfo = {
  url: string;
  username: string;
  password: string;
  clientId: string;
  keepalive: number;
  connectTimeout: number;
  reconnectPeriod: number;
  onlinetopic: string;
  onlineqos: number;
  dashboard: FileInfo;
  dashboardcss: FileInfo;
};

const storedClientId = localStorage.getItem("myhelloiot_defaultClientId");
let clientId;
if (storedClientId) {
  clientId = storedClientId;
} else {
  clientId =
    "myhelloiot_" + Math.random().toString(16).substr(2).padEnd(13, "0");
  localStorage.setItem("myhelloiot-defaultid", clientId);
}

export const defaultConnectInfo = {
  url: "wss://mymqttbroker",
  username: "",
  password: "",
  clientId,
  keepalive: 60,
  connectTimeout: 30000,
  reconnectPeriod: 1000,
  onlinetopic: "",
  onlineqos: 0,
  dashboard: {
    name: "basic.jsx",
    type: "text/jsx",
    data: basicsampledata,
    hash: cyrb53str(basicsampledata),
  },
  dashboardcss: {
    name: "dashboard.css",
    type: "text/css",
    data: "",
    hash: cyrb53str(""),
  },
};

const STORECONNECTINFO = "myhelloiot-connectinfo";

export const loadConnectInfo = (): ConnectInfo => {
  try {
    const lsvalue = localStorage.getItem(STORECONNECTINFO);
    if (lsvalue) {
      return JSON.parse(lsvalue);
    }
    return defaultConnectInfo;
  } catch (e) {
    return defaultConnectInfo;
  }
};

export const saveConnectInfo = (connectInfo: ConnectInfo): void => {
  try {
    localStorage.setItem(STORECONNECTINFO, JSON.stringify(connectInfo));
  } catch (e) {}
};
