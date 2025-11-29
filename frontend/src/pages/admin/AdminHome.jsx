import Container from '../../components/Container'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import ButtonRow from '../../components/ui/ButtonRow'
import Button from '../../components/ui/Button'
import TextCenter from '../../components/ui/TextCenter'
import { Link } from 'react-router-dom'

export default function AdminHome() {
    return (
        <Container>
            <Section size="lg">
                <PageHeader title="Admin Dashboard">
                    Welcome to the Admin Dashboard
                </PageHeader>
                <TextCenter>
                    Welcome, admin! Please use the buttons below to navigate
                    through the admin pages.
                </TextCenter>
            </Section>

            <Section>
                <ButtonRow $justify="center">
                    <Button as={Link} to="/admin/products">
                        Manage Products
                    </Button>
                    <Button as={Link} to="/admin/orders">
                        View Orders
                    </Button>
                </ButtonRow>
            </Section>
        </Container>
    )
}
