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
  const { attributes, width, height, dataBinding, onPress, records } = props;
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

  const data = dataBinding || items;

  const itemWidth = width;
  const dataLength = data.length;
  const itemHeight = (height - itemSpace * (dataLength - 1)) / defaultItemSize;
  const lineNumber = title?.titleLineNum;

  const renderItem = useCallback(
    ({ item, index }) => {
      const isLastRecord = dataLength === index + 1;

      return (
        <TouchableOpacity
          style={{
            width: "100%",
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
          onPress={() => onPress && onPress("onPress", { itemId: item._id })}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Text
              style={{ display: "block" }}
              numberOfLines={lineNumber ? lineNumber : 1}
            >
              {item?.title?.text}
            </Text>

            <View
              style={{ marginLeft: "auto", height: "100%", display: "flex" }}
            >
              {btnFirst?.enabled && (
                <Button
                  icon="trash-can"
                  mode="contained"
                  onPress={() =>
                    onPress &&
                    onPress("btnFirst", {
                      itemId: item._id,
                      indexRecord: index,
                      externalId: records[index]?._id,
                    })
                  }
                >
                  {item?.btnFirst?.text}
                </Button>
              )}
            </View>
          </View>
        </TouchableOpacity>
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
        // borderStyle,
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
