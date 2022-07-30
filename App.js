import React from "react";
import { View } from "native-base";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  useToast,
  NativeBaseProvider,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-bold": require("./fonts/Roboto-Bold.ttf"),
    "roboto-italic": require("./fonts/Roboto-Italic.ttf"),
    "roboto-regular": require("./fonts/Roboto-Regular.ttf"),
  });
};

const Example = () => {
  const instState = [
    {
      title: "Pasear con el perro",
      isCompleted: true,
    },
    {
      title: "Junta a las 9 PM",
      isCompleted: false,
    },
    {
      title: "Contestar correos",
      isCompleted: false,
    },
    {
      title: "Tareas del cole",
      isCompleted: false,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();

  const addItem = (title) => {
    if (title === "") {
      toast.show({
        title: "Por favor ingrese texto",
        status: "Advertencia",
      });
      return;
    }

    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
        },
      ];
    });
  };

  const handleDelete = (index) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 10, marginTop: 40 }}>
      <Box>
        <Text
          style={{
            fontSize: 22,
            marginBottom: 20,
            fontWeight: "bold",
            fontFamily: "Roboto-Bold",
          }}
        >
          Tareas
        </Text>

        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder="Nueva Tarea"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={<Icon as={Feather} name="plus" size="sm" color="#FFF" />}
              onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }}
            />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack
                justifyContent="space-between"
                alignItems="center"
                backgroundColor={"#d8d8d8"}
                padding={15}
                flexDirection={"row"}
                borderRadius={5}
                key={item.title + itemI.toString()}
              >
                <Checkbox
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                ></Checkbox>
                <Text
                  flexShrink={1}
                  textAlign="left"
                  fontWeight={"bold"}
                  fontSize={15}
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "FFF" : "#151515",
                  }}
                  _dark={{
                    color: item.isCompleted ? "#333333" : "#151515",
                  }}
                  onPress={() => handleStatusChange(itemI)}
                >
                  {item.title}
                </Text>
                <IconButton
                  size="sm"
                  colorScheme="#ad80f6"
                  icon={
                    <Icon as={Entypo} name="minus" size="xs" color="#ad80f6" />
                  }
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  );
};
