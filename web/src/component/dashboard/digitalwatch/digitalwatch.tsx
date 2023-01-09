import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { AlignCenter } from 'react-bootstrap-icons';

function DigitalWatch() {

    const [date, setDate] = useState(new Date());
    const [today, setToday] = useState({
        todayName: "",
        thisMonth: "",
        thisYear: ""
    });
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday'];


    function refreshClock() {
        setDate(new Date());
    }

    useEffect(() => {
        setToday({
            todayName: dayName[date.getDay()],
            thisMonth: date.getMonth().toString(),
            thisYear: date.getFullYear().toString()
        })
        // (dayName[date.getDay()]);
        setInterval(refreshClock, 1000);
    }, []);

    return (
        <div className='m-2'>
            <Card border="secondary" style={{ width: '18rem' }}>
                <Card.Header>Digital Watch</Card.Header>
                <Card.Body>
                    <Card.Title className='d-flex align-items-end'>
                        <h1>{today.todayName}</h1>
                        <h3>-{today.thisMonth}-{today.thisYear}</h3>
                    </Card.Title>
                    <Card.Text>
                        <h3> {date.toLocaleTimeString()} </h3>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DigitalWatch;