import styled from 'styled-components'
import { Card, CardBody, CardSeparator } from '../ui/Card'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
`

const Label = styled.span`
    opacity: 0.85;
`

const TotalRow = styled(Row)`
    font-size: 1.2rem;
    font-weight: 700;
`

export default function OrderTotals({ subtotal, shipping = 'Free', total }) {
    return (
        <Card>
            <CardBody>
                <Row>
                    <Label>Subtotal</Label>
                    <span>£{subtotal.toFixed(2)}</span>
                </Row>

                <Row>
                    <Label>Shipping</Label>
                    <span>{shipping}</span>
                </Row>

                <CardSeparator />

                <TotalRow>
                    <Label>Order Total</Label>
                    <span>£{total.toFixed(2)}</span>
                </TotalRow>
            </CardBody>
        </Card>
    )
}
