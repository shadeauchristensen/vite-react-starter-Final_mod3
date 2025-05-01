import React, { useEffect, useState } from "react"
import { fetchSchedules } from "../services/api"
import { Link } from 'react-router-dom'

export default function ScheduleList() {
    const [schedules, setSchedules] = useState([])

    useEffect(() => {
        fetchSchedules()
        .then(data => setSchedules(data.data))
        .catch(error => console.error('Error; Failed to load schedules:', error))
    }, [] )

    return (
        <div>
            <img src="/image.png" alt="Shadow Metal Fest Logo" className="logo" />
            {/* <h1>Shadow Music Fest</h1> */}
            <ul>
                {schedules.map(schedule => (
                    <li key={schedule.id}> 
                        <Link to={`/schedules/${schedule.id}`}>
                            <button>{schedule.attributes.title}</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}