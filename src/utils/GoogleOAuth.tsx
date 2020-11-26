import * as Google from "expo-google-app-auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/session/actions";

// Method returns an access token that the backend handles. I've also added a console log to see what the access token looks like.
export async function signInWithGoogleAsync() {
  
  try {
    const result = await Google.logInAsync({
      iosClientId:
        "127846493114-1pqi6j3bqsrg36q7t202it88efldcubi.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      console.log(result.accessToken);
     
    } 
    else {
      return { cancelled: true };
    }
  } 
  catch (e) {
    return { error: true };
  }
}
