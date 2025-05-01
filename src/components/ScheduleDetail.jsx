import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchScheduleId, createShow, deleteShow } from "../services/api"
import { useNavigate } from 'react-router-dom'

export default function ScheduleDetail() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [schedule, setSchedule] = useState(null)
    const [searchBand, setSearchBand] = useState('')
    const [newShow, setNewShow] = useState({
        artist: '',
        location: '',
        date: '',
        time: ''
    })

    const correctStage = (input) => {
        const value = input.trim().toLowerCase()

        if (value === "main" || value === "main stage") return "Main Stage"
        if (value === "side" || value === "side stage") return "Side Stage"

        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    }

    const handleDelete = (showId) => {
        deleteShow(id, showId)
        .then(() => {
            return fetchScheduleId(id)})
        .then(data => setSchedule(data.data))
        .catch(error => console.error('Error! Cannot delete show:', error))
    }

    const handleAddShow = (event) => {
        event.preventDefault()
        const showData = {
            show: {
                artist: newShow.artist,
                location: correctStage(newShow.location),
                date: newShow.date,
                time: newShow.time
            }
        }

        createShow(id, showData)
            .then(() => fetchScheduleId(id))
            .then(data => {
                setSchedule(data.data)
                setNewShow({ artist: '', location: '', date: schedule.attributes.date, time: '' })
            })
            .catch(error => console.error('Error submitting your band:', error))
    }

    useEffect(() => {
        fetchScheduleId(id)
        .then(data => {
            setSchedule(data.data)
            setNewShow(prev => ({
                ...prev,
                date: data.data.attributes.date
            }))
        })
        .catch(error => console.error('Error loading schedule:', error))
    }, [id])

    if (!schedule)
        return <p>Loading... Please wait</p>

    return (
        <div>
        <img src="/image.png" alt="Shadow Metal Fest Logo" className="logo" />
            <h2>{schedule.attributes.title}</h2>
            <p>Date: {schedule.attributes.date}</p>

            <h3>Search for Bands</h3>
                <input 
                    type="text"
                    placeholder="Search for Band"
                    value={searchBand}
                    onChange={(event) => setSearchBand(event.target.value)}
                />

            <h3>Lineup</h3>
                <ul>
                    {schedule.attributes.shows
                    .filter(show => show.artist.toLowerCase().includes(searchBand.toLowerCase()))
                    .map(show=> (
                        <li key={show.id}>
                            <p><strong>Band Name:</strong> {show.artist}</p>
                            <p><strong>Stage Name:</strong> {show.location}</p>
                            <p><strong>Time Set Starts:</strong> {show.time ? show.time.slice(11, 16) : 'TBD'}</p>
                            <button onClick={() => handleDelete(show.id)}>🗑️ Remove</button>
                        </li>
                    ))}
                </ul>

            <h3> Request a spot for your Band </h3>
            <form onSubmit={handleAddShow}>
                <input
                    type="text"
                    placeholder="Band Name"
                    value={newShow.artist}
                    onChange={(event) => setNewShow(
                        {...newShow, artist: event.target.value}
                    )}
                />
                <input
                    type="text"
                    placeholder="Stage"
                    value={newShow.location}
                    onChange={(event) => setNewShow(
                        {...newShow, location: event.target.value}
                    )}
                />
                <input
                    type="text"
                    placeholder="Time (ex. 24:00)"
                    value={newShow.time}
                    onChange={(event) => setNewShow(
                        {...newShow, time: event.target.value}
                    )}
                />
            <button type="Submit">Submit</button>
            </form>

            <h3>Users Attending:</h3>
                <ul>
                {schedule.attributes.users.map(user => (
                    <li key={user.id}>{user.first_name} {user.last_name} - {user.email}</li>
                ))}
                </ul>
                <button onClick={() => navigate('/')}> ← Back to All Schedules </button>

                
        </div>
    )
}