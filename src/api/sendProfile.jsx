
//api to send profile data to Firebase
const sendProfile = async (profileData) => {
  try {
    const response = await fetch(
      "https://profile-f463e-default-rtdb.firebaseio.com/profiles.json",
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return { id: data.name, ...profileData };

  } catch (error) {
    throw new Error("Failed to send profile: " + error.message);
  }
};

export default sendProfile;
