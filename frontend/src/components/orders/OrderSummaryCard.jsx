import styled from 'styled-components'
import { Card, CardBody, CardTitle, CardSeparator } from '../ui/Card'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
`

const Label = styled.span`
    opacity: 0.8;
`

export default function OrderSummaryCard({ id, date, status, checkout }) {
    return (
        <Card>
            <CardBody>
                {!checkout && <CardTitle $center>Order #{id}</CardTitle>}

                <Row>
                    <Label>Status</Label>
                    <span>{status}</span>
                </Row>

                <CardSeparator />

                <Row>
                    <Label>Date</Label>
                    <span>{new Date(date).toLocaleString()}</span>
                </Row>
            </CardBody>
        </Card>
    )
}
