
/**
 * Type for block type
 * @typedef {'header' | 'paragraph' | 'list' | 'image' | 'table' | 'raw'} BlockType
 */
type BlockType = 'header' | 'paragraph' | 'list' | 'image' | 'table' | 'raw';

/**
 * Interface for block data
 * @typedef BlockData
 * @property {string} [text]
 * @property {number} [level]
 * @property {'left' | 'right' | 'center' | 'justify'} [align]
 * @property {'ordered' | 'unordered'} [style]
 * @property {string[]} [items]
 * @property {{url: string}} [file]
 * @property {string[][]} [content]
 */
interface BlockData {
    text?: string;
    level?: number;
    align?: 'left' | 'right' | 'center' | 'justify';
    style?: 'ordered' | 'unordered';
    items?: string[];
    file?: {url: string};
    content?: string[][];
}

/**
 * Interface for block
 * @typedef Block
 * @property {string} id
 * @property {BlockType} type
 * @property {BlockData} data
 */
interface Block {
    id: string;
    type: BlockType;
    data: BlockData;
}

/**
 * Interface for model
 * @typedef Model
 * @property {number} time
 * @property {Block[]} blocks
 * @property {string} version
 */
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
    page: string;

    /**
     * Creates a new block model.
     * @class
     * @param {string} id - The id of the block model.
     * @param {number} time - The time of the block model.
     * @param {Block[]} blocks - The blocks of the block model.
     * @param {string} version - The version of the block model.
     * @param {string} page - The page of the block model.
     */
    constructor(id: string, time: number, blocks: Block[], version: string, page: string) {
        this.id = id;
        this.time = time;
        this.blocks = blocks;
        this.version = version;
        this.page = page;
    }

    /**
     * Creates a block model from JSON.
     * @param {object} json - The JSON to create the block model from.
     * @returns {BlockModel} The created block model.
     */
    static fromJson(json: any): BlockModel {
        const {id, time, blocks, version, page } = json;
        return new BlockModel(id, time, blocks, version, page);
    }

    /**
     * Converts the block model to JSON.
     * @returns {object} The JSON representation of the block model.
     */
    toJson(): object {
        return {
            id: this.id,
            time: this.time,
            blocks: this.blocks,
            version: this.version
        };
    }
}