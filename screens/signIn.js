// //web: 769636755616-paf43sdaj60h3udfuh1ifn7ftevguge5.apps.googleusercontent.com, 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
// // ios: 769636755616-mcg18g9lvjkruac9icnf199oc1kpqil3.apps.googleusercontent.com

// import React from 'react'
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

// const signIn = () => {
//     WebBrowser.maybeCompleteAuthSession();

//     const [accessToken, setAccessToken] = React.useState(null);
//     const [user, setUser] = React.useState(null);
//     const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//         clientId: "769636755616-paf43sdaj60h3udfuh1ifn7ftevguge5.apps.googleusercontent.com",
//         iosClientId: "769636755616-mcg18g9lvjkruac9icnf199oc1kpqil3.apps.googleusercontent.com"
//     });

//     React.useEffect(() => {
//         if (response?.type === 'success') {
//             setAccessToken(response.authentication.accessToken);
//             accessToken && fetchUserInfo();
//         }
//     }, [response, accessToken]);
    
//     async function fetchUserInfo() {
//         let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             }
//         });
//         const userInfo = await response.json();
//         console.log(userInfo);
//         setUser(userInfo);
//     }

//     const showUserInfo = () => {
//         if (user) {
//             return (
//                 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome</Text>
//                     <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
//                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
//                 </View>
//             )
//         }
//     }
        
//   return (
//       <View style={styles.container}>
          
//           {user && <ShowUserInfo />}
//           {user === null &&
//               <>
//               <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
              
//               <TouchableOpacity 
//                   disabled={!request}
//                   onPress={() => {
//                       promptAsync();
                      
//                   }}
//                   style={{ backgroundColor: '#4285F4', padding: 10, borderRadius: 5, marginTop: 20 }}
//               >
//                   <Text style={{ color: 'white', fontSize: 20 }}>Sign In with Google</Text>   
//               </TouchableOpacity>
        
//               </>
//           }
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

// export default signIn