import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { Home } from "./src/pages/Home";

export const App: React.FC = () => (
  <Fragment>
    <StatusBar
      barStyle="light-content"
      translucent
      backgroundColor="transparent"
    />
    <Home />
  </Fragment>
);
