import { Column, Row } from '@/shared/ui/Table/Table';

export type UniqueIdentifier = string | number;

export type ElementNames = 'ElementImg' | 'ElementTable' | 'ElementVideo' | 'ElementText' | 'ElementClock';

export enum ScreenResolution {
    '1024x768' = '1024x768',
    '1280x1024' = '1280x1024',
    '1600x1200' = '1600x1200',
    '1920x1200' = '1920x1200',
    '2560x2048' = '2560x2048',
    '3840x2400' = '3840x2400',
}

export type SizeText = 1 | 2 | 3 | 4 | 5;

export interface ImgProperties {
    value: string;
}

export interface TableProperties {
    rows: Row[];
    columns: Column[];
    background: string;
}

export interface VideoProperties {
    value: string;
}

export interface TextProperties {
    value: string;
    color: string;
    background: string;
    size: SizeText;
}

export interface ClockProperties {
    value: string;
}

export interface ElementProperties<T extends ElementNames = ElementNames> {
    id: UniqueIdentifier;
    name: T;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    properties: Partial<ImgProperties & TableProperties & VideoProperties & TextProperties & ClockProperties>;
}

export interface ConstructorPageSchema {
    elements: ElementProperties[];
    selectedIds: UniqueIdentifier[];
    screenResolution: ScreenResolution;
    timeZone: string;
    editCellTable?: { col: string, row?: string };
    isModeler: boolean;
    background: string;
}
