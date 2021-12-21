import React, { useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  VirtualizedList,
  SafeAreaView,
  TouchableOpacity,
  // Button,
} from "react-native";
import { Button } from "react-native-paper";

function NocodeImage(props) {
  const { attributes, width, height, dataBinding, onPress } = props;
  const {
    text,
    color,
    opacity,
    backgroundColor,
    fontSize,
    borderColor,
    borderStyle,
    borderWidth,
    borderRadius,
    items = [],
    itemSpace = 5,
    defaultItemSize = 3,
    title,
    btnFirst,
  } = attributes;
  console.log("props", props);
  console.log("height", height);
  console.log("items", items);
  console.log("attributes", attributes);

  const data = dataBinding || items;

  const itemWidth = width;
  const dataLength = data.length;
  const itemHeight = (height - itemSpace * (dataLength - 1)) / defaultItemSize;

  const renderItem = useCallback(
    ({ item, index }) => {
      console.log("index", index);
      console.log("item", item);

      const isLastRecord = dataLength === index + 1;

      return (
        <View
          style={{
            width: "100%",
            height: itemHeight,
            marginBottom: isLastRecord ? 0 : itemSpace,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 5,
            }}
            onPress={onPress}
          >
            <Text>{item?.title?.text}</Text>

            <View
              style={{ marginLeft: "auto", height: "100%", display: "flex" }}
            >
              {btnFirst?.enabled && (
                <Button icon="trash-can" mode="contained" onPress={onPress}>
                  {btnFirst?.text}
                </Button>
              )}
            </View>
          </View>
        </View>
      );
    },
    [itemHeight, itemWidth, dataLength, itemSpace, btnFirst]
  );

  return (
    <SafeAreaView
      style={{
        width,
        height,
        borderColor,
        borderWidth,
        borderRadius,
        borderStyle,
      }}
    >
      <VirtualizedList
        data={data}
        getItemCount={() => dataLength}
        getItem={(data, idx) => data[idx]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NocodeImage;
