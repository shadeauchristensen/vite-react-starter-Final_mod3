import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchScheduleId, deleteShow } from "../services/api"

export default function ScheduleDetail() {
    const { id } = useParams()
    const [schedule, setSchedule] = useState(null)

    const handleDelete = (showId) => {
        deleteShow(id, showId)
        .then(() => {
            return fetchScheduleId(id)})
        .then(data => setSchedule(data.data))
        .catch(error => console.error('Error! Cannot delete show:', error))
    }

    useEffect(() => {
        fetchScheduleId(id)
        .then(data => setSchedule(data.data))
        .catch(error => console.error('Error loading schedule:', error))
    }, [id])

    if (!schedule)
        return <p>Loading... Please wait</p>

    return (
        <div>
            <h2>{schedule.attributes.title}</h2>
            <p>Date: {schedule.attributes.date}</p>

            <h3>Lineup</h3>
                <ul>
                    {schedule.attributes.shows.map(show=> (
                        <li key={show.id}>
                            {show.artist} playing at {show.location} @{show.time}
                                <button onClick={() => handleDelete(show.id)}>🗑️ Remove</button>
                        </li>
                    ))}
                </ul>

            <h3>Users Attending:</h3>
                <ul>
                {schedule.attributes.users.map(user => (
                    <li key={user.id}>{user.first_name} {user.last_name} - {user.email}</li>
                ))}
                </ul>
        </div>
    )
}