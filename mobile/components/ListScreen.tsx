import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Contact } from "../interfaces/Contact";
import { getAllContacts } from "../services/api";
import { useContacts } from "../ContactProvider";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import CreateScreen from "./CreateScreen";
const ListScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { contacts, setContacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await getAllContacts(debouncedQuery);
      if (contacts) {
        setContacts(contacts);
      } else {
        setContacts([]);
      }
    };
    fetchContacts();
  }, [debouncedQuery]);
  //create a onpress function to handle the add contact button it will navigate to <Tab.Screen name="Create" component={CreateScreen} />
  //add a onpress function to the TouchableOpacity tag
  const addContact = () => {
    navigation.navigate("Create");
  };

  //add a onpress function to the TouchableOpacity tag that will handle edit contact and will pass the contact object to the UpdateScreen
  const editContact = (contact: Contact) => {
    navigation.navigate("Update", { contact });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginEnd: 20, marginStart: 20 }}>
        <TextInput
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            margin: 5,
            borderRadius: 5,
            backgroundColor: "#f1f1f1",
            borderColor: "black",
            borderWidth: 1,
          }}
          placeholder="Search for contacts"
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={{
            alignSelf: "center",
            padding: 10,
            margin: 5,
            borderRadius: 5,
            backgroundColor: "black",
          }}
          onPress={addContact}
        >
          <Text
            style={{
              color: "white",
              paddingLeft: 5,
              paddingRight: 5,
              fontSize: 20,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => editContact(item)}
              key={index}
              style={styles.item}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ width: "55%" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.firstName + " " + item.lastName + " "}
                    </Text>
                    <Text>{item.phoneNumber}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ width: "55%" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.email}
                    </Text>
                    <Text>{item.address}</Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginStart: 10,
                    color: "darkgray",
                    textDecorationLine: "underline",
                  }}
                >
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text
          style={{
            marginTop: 20,
            color: "darkgray",
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Search not found...
        </Text>
      )}
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  item: {
    padding: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#000",
    marginLeft: "10%",
  },
});
