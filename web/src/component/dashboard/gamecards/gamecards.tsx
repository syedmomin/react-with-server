import { Card } from "react-bootstrap"
import GernateCard from "./eidt&CreateCard/gernatecards"


function GameCards() {

    return (
        <>
            <h1 className="mt-4">Simple Sidebar</h1>
            <Card className="bg-dark text-white">
                <Card.Img src="not yet" alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                </Card.ImgOverlay>
            </Card>
            <GernateCard/>
        </>
    )
}

export default GameCards


