import styled from 'styled-components'
import { CardSeparator } from '../ui/Card'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.sm} 0;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const Name = styled.p`
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
`

const Meta = styled.p`
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.75;
`

const PriceBlock = styled.div`
    text-align: right;
`

const Price = styled.p`
    margin: 0;
    font-size: 0.95rem;
`

const Total = styled.small`
    opacity: 0.75;
`

export default function OrderItemRow({ item }) {
    return (
        <>
            <Row>
                <Info>
                    <Name>{item.product.name}</Name>
                    <Meta>Qty: {item.quantity}</Meta>
                </Info>

                <PriceBlock>
                    <Price>£{item.price.toFixed(2)}</Price>
                    <Total>
                        Total: £{(item.price * item.quantity).toFixed(2)}
                    </Total>
                </PriceBlock>
            </Row>

            <CardSeparator />
        </>
    )
}
