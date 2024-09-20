import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Contact } from "../interfaces/Contact";
import { getAllContacts } from "../services/api";
import { useContacts } from "../ContactProvider";
const ListScreen = () => {
  const { contacts, setContacts } = useContacts();

  //fetch all contacts use getAllContacts function
  useEffect(() => {
    getAllContacts()
      .then((contacts) => {
        setContacts(contacts);
        console.log("contacts", contacts);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        style={{ flex: 1 }}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.item}>
            <Text>{index + 1 + "."}</Text>
            <Text>{item.firstName}</Text>
            <Text>{item.lastName}</Text>
            <Text>{item.phoneNumber}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Optional: Center the text horizontally
    padding: 16, // Optional: Add some padding
  },
  //style my Flatlist items just like a card
  item: {
    //make it a row
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: "white",
    //add a border raidus
    borderRadius: 10,
    //elevate the card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  //style my separator
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#000",
    marginLeft: "10%",
  },
});
