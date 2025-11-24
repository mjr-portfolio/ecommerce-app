import styled from 'styled-components'
import { CardSeparator } from '../ui/Card'
import Button from '../ui/Button'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.xs} 0;
    align-items: center;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const Name = styled.p`
    margin: 0;
    font-weight: 600;
`

const Meta = styled.p`
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
`

const Controls = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
`

export default function CartItemRow({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) {
    return (
        <>
            <Row>
                <Info>
                    <Name>{item.product.name}</Name>
                    <Meta>Qty: {item.quantity}</Meta>
                </Info>

                <Controls>
                    <Button
                        variant="secondary"
                        onClick={() => onDecrease(item)}
                    >
                        -
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => onIncrease(item)}
                    >
                        +
                    </Button>
                    <Button variant="danger" onClick={() => onRemove(item)}>
                        Remove
                    </Button>
                </Controls>
            </Row>

            <CardSeparator />
        </>
    )
}
