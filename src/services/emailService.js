// import imageCompression from 'browser-image-compression';

const fetchUserEmailSpaces = async (userID) => {
  try {
    // TODO: VERY IMPORTANT THAT ONLY USER GETS OWN EMAILS, ADD AUTHENTICATION !! WITH JWT :)
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}emails/get-user-emails?userID=${encodeURIComponent(userID)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch workspaces");
    }

    const data = await response.json();
    
    return data.emailspaces.map(emailspaces => ({
      ...emailspaces,
      emailspaceIDs: emailspaces.emailspaceID,
      emailAddresses: emailspaces.emailAddresses,
      descriptions: emailspaces.descriptions || 'No description available'
    })) || [];
  } catch (error) {
    console.error("Error fetching emailspaces:", error);
    return [];
  }
}; 

const createNewEmailSpace = async (userID, emailAddress, description) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}emails/create-emailspace`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID,
                    emailAddress,
                    description
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create emailspace");
        }

        const data = await response.json();
        return data.emailspace;
    } catch (error) {
        console.error("Error creating emailspace:", error);
        throw error;
    }
}

const getLastActiveEmailSpace = async (userID) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}emails/get-last-active-space?userID=${encodeURIComponent(
        userID
      )}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch onboarding status");
    }

    return data.last_active_space_id;
  } catch (error) {
    console.error("Error fetching onboarding status:", error);
    throw error;
  }
};

export { fetchUserEmailSpaces, createNewEmailSpace, getLastActiveEmailSpace }; 