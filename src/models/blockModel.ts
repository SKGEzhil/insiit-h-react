type BlockType = 'header' | 'paragraph' | 'list' | 'image' | 'table';

interface BlockData {
    text?: string;
    level?: number;
    align?: 'left' | 'right' | 'center' | 'justify';
    style?: 'ordered' | 'unordered';
    items?: string[];
    file?: {url: string};
    content?: string[][];
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
    id: string;
    time: number;
    blocks: Block[];
    version: string;

    constructor(id: string, time: number, blocks: Block[], version: string) {
        this.id = id;
        this.time = time;
        this.blocks = blocks;
        this.version = version;
    }

    static fromJson(json: any): BlockModel {
        const {id, time, blocks, version } = json;
        return new BlockModel(id, time, blocks, version);
    }

    toJson(): object {
        return {
            id: this.id,
            time: this.time,
            blocks: this.blocks,
            version: this.version
        };
    }
}