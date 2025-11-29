import Button from '../ui/Button'
import {
    Form,
    FormRow,
    FormLabel,
    FormInput,
    FormActions,
    FormTextArea,
} from '../ui/Form'

export default function AdminProductForm({ product, onSubmit, submitLabel }) {
    return (
        <Form onSubmit={onSubmit}>
            <FormRow>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput
                    id="name"
                    name="name"
                    defaultValue={product?.name || ''}
                    required
                />
            </FormRow>

            <FormRow>
                <FormLabel htmlFor="price">Price (£)</FormLabel>
                <FormInput
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={product?.price || ''}
                    required
                />
            </FormRow>

            <FormRow>
                <FormLabel htmlFor="stock">Stock</FormLabel>
                <FormInput
                    id="stock"
                    name="stock"
                    type="number"
                    defaultValue={product?.stock || ''}
                    required
                />
            </FormRow>

            <FormRow>
                <FormLabel htmlFor="image_url">Image URL</FormLabel>
                <FormInput
                    id="image_url"
                    name="image_url"
                    defaultValue={product?.image_url || ''}
                    placeholder="https://example.com/product.jpg"
                />
            </FormRow>

            <FormRow>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormTextArea
                    id="description"
                    name="description"
                    defaultValue={product?.description || ''}
                />
            </FormRow>

            <FormActions>
                <Button type="submit">{submitLabel}</Button>
            </FormActions>
        </Form>
    )
}
