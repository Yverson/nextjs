export type Commande = {
    site?: "EF" | "ID"
    date?: string
    profilimg?: string
    expertprenom?: string
    expertnom?: string
    expertpseudo?: string
    taux?: number
    clientName?: string
    email?: string
    tel?: string
    id?: string
    code?: "CHAT" | "TEL" | "MAIL"
    codetel?: string
    forfait?: string
    forfaitdesc?: string
    duree?: string
    dureerestante?: string
    montant?: number
    reversement?: number
    media?: string  
};

export type product = {
    image?: string
    name?: string
    sku?: string
    category?: string
    price?: number
    quantity?: number
    status?: string
    rating?: number
    id?: string
};
