export abstract class Image {
    constructor(protected src: string, protected alt?: string) {}

    getAlt(): string | undefined {
        return this.alt
    }

    getSrc(): string {
        return this.src
    }
}
