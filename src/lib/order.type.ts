export interface OrderProps {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string | null;
    created_at: string;
    updated_at: string
}