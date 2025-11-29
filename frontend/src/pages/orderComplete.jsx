import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Container from '../components/Container'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import TextCenter from '../components/ui/TextCenter'
import Button from '../components/ui/Button'
import ButtonRow from '../components/ui/ButtonRow'

const CardBase = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.card};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: ${({ theme }) => theme.spacing.lg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadow.card};
`

export default function OrderComplete() {
    return (
        <Container>
            <CardBase>
                <PageHeader>Order Complete!</PageHeader>

                <Section>
                    <TextCenter>
                        Thank you for your purchase. Your order has been
                        successfully processed.
                    </TextCenter>
                </Section>

                <Section size="lg">
                    <ButtonRow $justify="center">
                        <Link to="/products">
                            <Button>Continue Shopping</Button>
                        </Link>

                        <Link to="/orders">
                            <Button variant="secondary">View My Orders</Button>
                        </Link>
                    </ButtonRow>
                </Section>
            </CardBase>
        </Container>
    )
}
