import React, { useState, useEffect } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import './digitalwatch.css'
function DigitalWatch() {

    const [date, setDate] = useState(new Date());
    const [today, setToday] = useState({
        todayName: "",
        thisMonth: "",
        thisYear: "",
        todate:""
    });
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday'];


    function refreshClock() {
        setDate(new Date());
    }

    useEffect(() => {
        setToday({
            todayName: dayName[date.getDay()],
            thisMonth: date.getMonth().toString(),
            thisYear: date.getFullYear().toString(),
            todate:date.getDate().toString()
        })
        // (dayName[date.getDay()]);
        setInterval(refreshClock, 1000);
    }, []);

    return (
        <div className="d-flex justify-content-center m-3">
            <Card style={{ width: '22rem', height: '80vh' }}>
                <Card.Body className='digitalWatch'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <Carousel controls={false}>
                            <Carousel.Item interval={1000}>
                                <h2>{today.todayName}</h2>
                            </Carousel.Item>
                            <Carousel.Item interval={1000}>
                                <h3>{today.todate}-{today.thisMonth + 1}-{today.thisYear}</h3>
                                <h3> {date.toLocaleTimeString()} </h3>
                                <hr/>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DigitalWatch;