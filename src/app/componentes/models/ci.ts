export interface Ci {
    cis: Ci[];
}

export interface Ci {
    id?: string;
    destinatario: string;
    areaDestinatario: string;
    remetente: string;
    areaRemetente: string;
    comunicacao: string;
    data: Date;
}