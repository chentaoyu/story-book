export interface TransferItem {
    title: string;
    direction?: 'left' | 'right';
    disabled?: boolean;
    checked?: boolean;
    _hiden?: boolean;
    [key: string]: any;
}

export interface TransferCanMove {
    direction: string;
    list: TransferItem[];
}

export interface TransferChange {
    from: string;
    to: string;
    list: TransferItem[];
}
