export class Settings {
    constructor(
        public columnOffsets: { [source: string]: number } = {
            pix: 4,
            comprovante: 0
        }
    ) {}
}
