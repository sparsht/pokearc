import Card from "react-bootstrap/Card";

export default function PokemonCard(props) {
    return (
        <Card border="dark" className="p-2" style={{ width: '17rem', marginBottom: '1.5em' }}>
            <Card.Img className="mx-auto" variant="top" style={{width: '12rem', height: '12rem'}} src={`/images/${props.name}.png`} onError={
                (e) => {
                    e.target.src="/images/pokeball.jpeg";
                    e.target.width="100%";
                }} />
            <Card.Body>
                <Card.Title className="text-center">{props.name}</Card.Title>
                <hr/>
                <Card.Text>
                    <span className="d-flex justify-content-between"><span>Weight: <strong>{props.weight}</strong></span><span>Height: <strong>{props.height}</strong></span></span>
                    <span className="d-block">Type: <strong>{props.type?.join(", ")}</strong></span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}