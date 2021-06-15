import React from 'react'
import { useAuth } from "../../../contexts/AuthContext"

function VolunteerProfile() {

    const { dbUser } = useAuth();
    const { firstName, lastName, username, email, contact, dob} = dbUser;
    return (
        <div>
            
        </div>
    )
}

export default VolunteerProfile
