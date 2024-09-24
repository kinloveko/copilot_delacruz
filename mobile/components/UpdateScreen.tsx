import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Contact } from "../interfaces/Contact";
import { updateContact, deleteContact } from "../services/api"; // Assuming you have an updateContact function in your API service
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContacts } from "../ContactProvider";

const UpdateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contacts, setContacts } = useContacts();
  const [contact, setContact] = React.useState<Contact>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (route.params && (route.params as { contact: Contact }).contact) {
      const contactFromParams = (route.params as { contact: Contact }).contact;
      setContact(contactFromParams);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    try {
      console.log("before sending:", contact);
      const updatedContact = await updateContact(contact); // Use updateContact instead of createContact
      console.log("updatedContact:", updatedContact);
      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c.id === updatedContact.id ? updatedContact : c
        )
      );
      if (updatedContact) {
        setContact({
          id: "",
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

  const handleChange = (text: string, field: string) => {
    setContact({ ...contact, [field]: text });
  };

  //create a function that will handle for delete contact
  const handleDelete = async () => {
    try {
      // delete contact
      await deleteContact(contact.id);
      console.log("Contact deleted:", contact.id);

      // update the contacts state
      setContacts((prevContacts) =>
        prevContacts.filter((c) => c.id !== contact.id)
      );

      // if contact is deleted, navigate back to the list screen
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
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
        <Text style={{ textAlign: "center", color: "white" }}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDel} onPress={handleDelete}>
        <Text style={{ textAlign: "center", color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    margin: 10,
  },
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
  button: {
    alignSelf: "center",
    width: "80%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "black",
  },
  buttonDel: {
    alignSelf: "center",
    width: "80%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "red",
  },
  text: {
    margin: 5,
  },
});
