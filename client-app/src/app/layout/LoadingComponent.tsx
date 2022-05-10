import { Spinner } from "react-bootstrap";

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({ inverted = true, content = 'Loading ...' }: Props) {
    return (
        <div className="background-dimmer">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="background-dimmer-paragraph">{content}</p>
        </div>
    )
}