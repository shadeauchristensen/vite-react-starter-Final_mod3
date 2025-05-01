const BASE_URL = 'http://localhost:3000/api/v1'

export const fetchSchedules = async () => {
    const response = await fetch(`${BASE_URL}/schedules`)
    if (!response.ok) {
        throw new Error('Could not get schedules')
    }
    return await response.json()
}

export const fetchScheduleId = async (id) => {
    const response = await fetch(`${BASE_URL}/schedules/${id}`)
    if (!response.ok) {
        throw new Error('Could not get schedule')
    }
    return await response.json()
}

export const createShow = async (scheduleId, showData) => {
    const response = await fetch(`${BASE_URL}/schedules/${scheduleId}/shows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(showData)
    });
  
    if (!response.ok) throw new Error('Could not create show');
    return await response.json();
}

export const deleteShow = async (scheduleId, showId) => {
    const response = await fetch(`${BASE_URL}/schedules/${scheduleId}/shows/${showId}`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error('Could not delete show')
    }
}