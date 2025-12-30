// import imageCompression from 'browser-image-compression';

const fetchUserEmailSpaces = async (userId) => {
  try {
    // TODO: VERY IMPORTANT THAT ONLY USER GETS OWN EMAILS, ADD AUTHENTICATION !! WITH JWT :)
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}emails/get-user-emails?userId=${encodeURIComponent(userId)}`
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

const createNewEmailSpace = async (userId, emailAddress, description) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}emails/create-emailspace`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
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

export { fetchUserEmailSpaces, createNewEmailSpace }; 