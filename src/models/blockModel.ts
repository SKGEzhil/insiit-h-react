type BlockType = 'header' | 'paragraph' | 'list';

interface BlockData {
    text?: string;
    level?: number;
    align?: 'left' | 'right' | 'center' | 'justify';
    style?: 'ordered' | 'unordered';
    items?: string[];
}

interface Block {
    id: string;
    type: BlockType;
    data: BlockData;
}

interface Model {
    time: number;
    blocks: Block[];
    version: string;
}

export class BlockModel implements Model {
    time: number;
    blocks: Block[];
    version: string;

    constructor(time: number, blocks: Block[], version: string) {
        this.time = time;
        this.blocks = blocks;
        this.version = version;
    }

    static fromJson(json: any): BlockModel {
        const { time, blocks, version } = json;
        return new BlockModel(time, blocks, version);
    }

    toJson(): object {
        return {
            time: this.time,
            blocks: this.blocks,
            version: this.version
        };
    }
}