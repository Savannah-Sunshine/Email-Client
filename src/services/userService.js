// import imageCompression from 'browser-image-compression';
// might be useful in future if sending lots of data


// ?? this should also run business logic on server, because it's creating users (aka payment to be made)
const createUser = async (emailAddress) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}onboard/create/profile`, { // todo, security, don't allow open creation of users
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailAddress,
                //userID, // server generates userID
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        return response.json();
    } catch (error) {
        console.error("Error creating new user:", error);
        return false;
    }
};

const getOnboardingStatus = async (userID) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}onboarding/get-onboarding-status?userID=${encodeURIComponent(
        userID
      )}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch onboarding status");
        }

        return data.onboardingStatus;
    } catch (error) {
        console.error("Error fetching onboarding status:", error);
        throw error;
    }
};

const updateOnboardingStatus = async (userID, status) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}onboarding/update-onboarding-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID,
                    status
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update onboarding status");
        }
    } catch (error) {
        console.error("Error updating onboarding status:", error);
        throw error;
    }
};

// If adding new email, call emailService
const updateUser = async (userId, displayName, imageUrl) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}user/update/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                imageUrl,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return response.json();
    } catch (error) {
        console.error("Error updating user:", error);
        return false;
    }
};

const getUserByAEmailAddress = async (emailAddress) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}user/get-user-id-by-email?emailAddress=${encodeURIComponent(
        emailAddress
      )}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch user data");
        }

        return data.userID;
    } catch (error) {
        console.error("Error fetching user data by email:", error);
        throw error;
    }
};

export {
    createUser,
    updateUser,
    getOnboardingStatus,
    updateOnboardingStatus,
    getUserByAEmailAddress
};