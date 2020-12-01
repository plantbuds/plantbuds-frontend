import * as Google from "expo-google-app-auth";

// Method returns an access token that the backend handles. I've also added a console log to see what the access token looks like.
export async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      iosClientId:
        "127846493114-1pqi6j3bqsrg36q7t202it88efldcubi.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      return result.accessToken;
    } else {
      console.log("cancelled");
    }
  } catch (e) {
    console.log("error", e);
  }
}

export async function signUpWithGoogleAsync() {
  let tokens = [];
  try {
    const result = await Google.logInAsync({
      iosClientId:
        "127846493114-1pqi6j3bqsrg36q7t202it88efldcubi.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      tokens.push(result.idToken);
      tokens.push(result.accessToken);
      return tokens;
    } else {
      console.log("cancelled");
    }
  } catch (e) {
    console.log("error", e);
  }
}
