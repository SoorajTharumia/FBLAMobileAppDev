import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { getTwitterData } from "../routes/routes";
import twitterpng from "../assets/parklandTwitter.jpeg";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [photos, setPhotos] = useState([]);

  // useEffect(() => {
  //   getTwitterData().then((data) => {
  //     setTweets(data.tweets);
  //     setPhotos(data.photos);
  //   });
  // }, []);

  if (tweets.length === 0 || photos.length === 0) return (
    <View key={"loading"} style={styles.container}>
      <Text>Loading...</Text>
    </View>
  )

  // return (
  //   <ScrollView>
  //     <View style={styles.container} key = {"ready"}>
  //       {Object.keys(tweets).map((tweet, index) => {
  //         var tweetText = tweets[tweet].text;
  //         var tweetPhoto = null;
  //         if ("url" in photos[index]) {
  //           tweetPhoto = photos[index].url;
  //         } else if ("preview_image_url" in photos[index]) {
  //           tweetPhoto = photos[index].preview_image_url;
  //         }
  //         return (
  //           <View key={tweet.id} style={styles.tweet}>
  //             <View style={styles.twitterHeader}>
  //               <Image style={styles.pfp} source={twitterpng} />
  //               <View>
  //                 <Text style={styles.username}>Parkland Schools</Text>
  //                 <Text style={styles.handle}>@ParklandSchools</Text>
  //                 <Text></Text>
  //               </View>
  //             </View>
  //             <Text style={styles.body}>
  //               {(tweetText = tweetText.substring(0, tweetText.length - 24))}{" "}
  //             </Text>
  //             <Image
  //               style={styles.image}
  //               source={{
  //                 uri: tweetPhoto,
  //               }}
  //             />
  //           </View>
  //         );
  //       })}
  //     </View>
  //   </ScrollView>
  // );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  tweet: {
    width: "90%",
    fontSize: 20,
    borderWidth: 3,
    borderColor: "#d9d9d9",
    padding: 20,
    borderRadius: 15,
    margin: 15,
    alignSelf: 'center'
  },
  image: {
    width: "90%",
    height: 300,
    margin: 15,
    borderRadius: 15,
  },
  handle: {
    fontSize: 15,
    paddingLeft: 10,
  },
  username: {
    fontSize: 30,
    paddingLeft: 10,
  },
  body: {
    fontSize: 20,
  },
  pfp: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  twitterHeader: {
    flexDirection: "row",
  },
});
