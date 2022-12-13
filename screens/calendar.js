import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { getCalendarData } from "../routes/routes";


const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCalendarData().then((data) => {
      setEvents(data.events);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Find events throughout the Parkland School District below!</Text>
        {events.map(event => {
          eventsOnlyString = event.substr(14, event.length - 1 || event.indexOf("    "))
          eventsOnlyString = eventsOnlyString.split("    ")
          return (
            <View key={event.id} style={styles.box}>
              <Text style={styles.date} key={events.id}>{event.substr(1, 11)}</Text>
              <Text style={styles.body} key={events.id}>
                {eventsOnlyString.map(i => {
                  return (
                    <>
                      <Text>
                        {i}
                        {"\n"}
                        {"\n"}
                      </Text>
                      <Text></Text>
                    </>
                  );
                })}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#484B70",
  },
  box: {
    width: "90%",
    fontSize: 20,
    borderWidth: 5,
    borderColor: "#a8a8a8",
    padding: 20,
    borderRadius: 15,
    margin: 15,
    alignSelf: "center",
    backgroundColor: "#DfDfe2",
  },
  date: {
    fontSize: 25,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  body: {
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
  },
});
