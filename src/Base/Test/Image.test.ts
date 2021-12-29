import { TestImage } from './__mocks__/TestImage'

describe('Image', () => {
    it('properties', () => {
        const img = new TestImage('src_image', 'alt_image')
        expect(img.getAlt()).toBe('alt_image')
        expect(img.getSrc()).toBe('src_image')
    })
})
