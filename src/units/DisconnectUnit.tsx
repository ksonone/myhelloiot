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
import { notification } from "antd";
import { IClientSubscribeOptions } from "mqtt";
import { useDispatchDisconnect } from "../AppStoreProvider";
import { MQTTMessage, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import { StrValueFormat } from "../format/ValueFormat";

type DisconnectUnitProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
  keyvalue: string;
};

const DisconnectUnit: React.FC<DisconnectUnitProps> = ({
  subtopic,
  suboptions,
  keyvalue,
}) => {
  const format = StrValueFormat();
  const dispatchDisconnect = useDispatchDisconnect();
  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      if (keyvalue === format.toDisplay(message)) {
        dispatchDisconnect();
      } else {
        notification.warn({
          message: "Disconnection key not valid.",
        });
      }
    },
    suboptions
  );

  return <></>;
};

export default DisconnectUnit;
