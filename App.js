import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./src/redux/reducers/rootReducer";
import { TabView, SceneMap } from "react-native-tab-view";
import { Main } from "./src/pages/Main/Main";
import { History } from "./src/pages/History/History";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));
export default function TabViewExample() {
  /*   const [data, setData] = useState([]);*/

  const openFirstScreen = () => {
    setIndex(0);
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Главная" },
    { key: "second", title: "История" },
  ]);
  const HistoryPage = () => {
    return <History showHistory={openFirstScreen} />;
  };
  const MainPage = () => {
    return <Main  />;
  };
  const renderScene = SceneMap({
    first: MainPage,
    second: HistoryPage,
  });
  const initialLayout = { width: Dimensions.get("window").width };
  return (
    
    <Provider store={store}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Provider>
  );
}
