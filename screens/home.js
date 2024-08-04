import React, { useEffect, useState , useContext} from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, Pressable } from "react-native";
import { getTwitterData } from "../routes/routes";
import twitterpng from "../assets/parklandTwitter.jpeg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../firebase/config";
import UserContext from "../components/userContext";


const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [liked, setLiked] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [likes, setLikes] = useState({});

  const user = useContext(UserContext);

  const fetchLikesData = async () => {
    try {
      const likesData = await firebase.firestore()
        .collection("tweetLikes")
        .doc("likes")
        .get();
      if (likesData.exists) {
        return likesData.data();
      } else {
        return {};
      }
    } catch (error) {
      console.error("Error fetching likes data:", error);
    }
  };

  useEffect(() => {
    getTwitterData().then(async (data) => {
      setTweets(data.tweets);
      
      data.photos.unshift("");
      setPhotos(data.photos);
      

      const fetchedLikes = await fetchLikesData();
      if (Object.keys(fetchedLikes).length === 0) {
        const initialLikes = {};
        data.tweets.forEach((tweet) => {
          initialLikes[tweet.id] = 0;
        });
        setLikes(initialLikes);
      } else {
        setLikes(fetchedLikes);
      }
    });
  }, []);


  if (tweets.length === 0 || photos.length === 0) return (
    <View key={"loading"} style={styles.container}>
      <Text>Loading...</Text>
    </View>
  )

  const showOverlay = (photo) => {
    setSelectedImage(photo);
    setOverlayVisible(true);

  };

  const hideOverlay = () => {
    setOverlayVisible(false);
  };
  
  const updateLikesData = async (newLikes) => {
    try {
      await firebase.firestore().collection("tweetLikes").doc("likes").set(newLikes);
    } catch (error) {
      console.error("Error updating likes data:", error);
    }
  };

  const likeTweet = async (tweetId) => {
    const newLikes = { ...likes };
    const newLiked = { ...liked };

    if (newLiked[tweetId]) {
      newLikes[tweetId] = newLikes[tweetId] - 1;
      newLiked[tweetId] = false;
    } else {
      newLikes[tweetId] = newLikes[tweetId] + 1;
      newLiked[tweetId] = true;
    }

    setLikes(newLikes);
    setLiked(newLiked);
    await updateLikesData(newLikes);
  };

  return (
    <ScrollView>
      <View style={styles.container} key={"ready"}>
        <Text style={styles.text}>
          Find all of the Parkland School District's tweets below for update to
          date information!
        </Text>
        {Object.keys(tweets).map((tweet, index) => {
          try {
            var tweetText = tweets[tweet].text;
            var tweetPhoto = null;
            if ("url" in photos[index]) {
              tweetPhoto = photos[index].url;
            } else if ("preview_image_url" in photos[index]) {
              tweetPhoto = photos[index].preview_image_url;
            }
            const tweetId = tweets[tweet].id;
            const likeNum = likes[tweetId];
            return (
              <View key={tweetId} style={styles.tweet}>
                <View style={styles.twitterHeader}>
                  <Image style={styles.pfp} source={twitterpng} />
                  <View>
                    <Text style={styles.username}>Parkland Schools</Text>
                    <Text style={styles.handle}>@ParklandSchools</Text>
                    <Text></Text>
                  </View>
                </View>
                <Text style={styles.body}>
                  {tweetText.substring(0, tweetText.length - 24)}{" "}
                </Text>
                <TouchableOpacity onPress={() => showOverlay(tweetPhoto)}>
                  <Image style={styles.image} source={{ uri: tweetPhoto, }} />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity key={tweetId} onPress={() => likeTweet(tweetId)} style={styles.likes}>
                    <MaterialCommunityIcons
                      name={liked[tweetId] ? "heart" : "heart-outline"}
                      size={24}
                      color={liked[tweetId] ? "red" : "black"}
                    />
                    <Text style={styles.likeCount}>{likeNum}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } catch (e) {
            console.log(e);
          }
        })}
      </View>
      <Modal animationType="fade" transparent={true} visible={overlayVisible}>
        <TouchableOpacity style={styles.overlay} onPress={hideOverlay}>
          <Image
            style={styles.overlayImage}
            source={{
              uri: selectedImage,
            }}
          />
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );

};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#484B70",
  },
  tweet: {
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
  image: {
    width: "90%",
    height: 300,
    margin: 15,
    borderRadius: 15,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
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
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontStyle: "italic",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
  }, 
  likeCount: {
    fontSize: 20,
    paddingLeft: 5,
  }
});
