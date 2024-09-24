import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Contact } from "../interfaces/Contact";
import { createContact } from "../services/api";
import { CreateContact } from "../interfaces/CreateContact";
import { useNavigation } from "@react-navigation/native";
import { useContacts } from "../ContactProvider";
const CreateScreen = () => {
  const navigation = useNavigation();
  const { contacts, setContacts } = useContacts();
  const [contact, setContact] = React.useState<CreateContact>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  //create a arrow function that will handle the submit button
  const handleSubmit = async () => {
    try {
      console.log("before sending:", contact);
      const newContact = await createContact(contact);
      console.log("newContact:", contact);
      setContacts((prevContacts) => [...prevContacts, newContact]);
      if (newContact) {
        //reset the fields TextInputs to empty
        setContact({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
        });

        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //create a function that will handle change of textinput fields
  const handleChange = (text: string, field: string) => {
    setContact({ ...contact, [field]: text });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={contact.firstName}
        onChangeText={(text) => {
          handleChange(text, "firstName");
        }}
      />
      <Text style={styles.text}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={contact.lastName}
        onChangeText={(text) => {
          handleChange(text, "lastName");
        }}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={contact.email}
        onChangeText={(text) => {
          handleChange(text, "email");
        }}
      />
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={contact.phoneNumber}
        onChangeText={(text) => {
          handleChange(text, "phoneNumber");
        }}
      />
      <Text style={styles.text}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={contact.address}
        onChangeText={(text) => {
          handleChange(text, "address");
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ textAlign: "center", color: "white" }}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    margin: 10,
  },
  //style for my input fields with 100% width
  input: {
    alignSelf: "center",
    width: "90%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    borderColor: "black",
    borderWidth: 1,
  },
  //style for my button
  button: {
    alignSelf: "center",
    width: "80%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "black",
  },
  //style for text label
  text: {
    margin: 5,
  },
});
