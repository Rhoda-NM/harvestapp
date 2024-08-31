import React from 'react'

function DonorCard({id, email,name, location}) {
    if (!name || !email || !location) {
        return <div>Loading...</div>;
      }
  return (
    <div>
        <h3>{name}</h3>
        <p>{email}</p>
        <p>{location}</p>
    </div>
  )
}

export default DonorCard