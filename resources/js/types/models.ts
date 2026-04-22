export type PremiseCategory = {
    id: number;
    name: string;
    code: string | null;
    premises_count?: number;
    created_at: string;
    updated_at: string;
};

export type Premise = {
    id: number;
    premise_category_id: number;
    owner_name: string;
    premise_name: string | null;
    grant_number: string | null;
    ic_number: string | null;
    mailing_address: string | null;
    phone_number: string | null;
    zone: string | null;
    area: string | null;
    status: 'active' | 'inactive';
    category?: PremiseCategory;
    tax_records?: TaxRecord[];
    building_records?: BuildingRecord[];
    current_year_tax?: TaxRecord | null;
    latest_building_record?: BuildingRecord | null;
    created_at: string;
    updated_at: string;
};

export type TaxRecord = {
    id: number;
    premise_id: number;
    tax_year: number;
    payment_status: string;
    amount_due: string | null;
    amount_paid: string | null;
    payment_date: string | null;
    remarks: string | null;
    created_at: string;
    updated_at: string;
};

export type BuildingRecord = {
    id: number;
    premise_id: number;
    submission_status: string;
    approval_status: string | null;
    submission_date: string | null;
    approval_date: string | null;
    remarks: string | null;
    created_at: string;
    updated_at: string;
};

export type WasteCollectionSchedule = {
    id: number;
    area: string | null;
    zone: string | null;
    road_name: string | null;
    premise_category_id: number | null;
    collection_day: string;
    collection_time: string | null;
    notes: string | null;
    status: 'active' | 'inactive';
    category?: PremiseCategory;
    created_at: string;
    updated_at: string;
};

export type CheckingLog = {
    id: number;
    user_id: number;
    premise_id: number;
    checked_at: string;
    remarks: string | null;
    user?: import('./auth').User;
    premise?: Premise;
    created_at: string;
    updated_at: string;
};

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: { url: string | null; label: string; active: boolean }[];
};
