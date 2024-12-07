import { createClient, PostgrestSingleResponse } from '@supabase/supabase-js';
import { getUser } from '../utils/core';

interface ListInterface {
    (table: string): Promise<any[]>
}

interface UpdateInterface {
    (table: string, data: any, id: string | number | null): Promise<PostgrestSingleResponse<any[]>>
}

interface DropInterface {
    (table: string, id: string | number): Promise<PostgrestSingleResponse<any>>
}

interface GetInterface {
    (table: string, conditions: any[]): Promise<PostgrestSingleResponse<any>>
}

interface SaveInterface {
    (table: string, data: any): void
}


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
const user = getUser();

const update: UpdateInterface = async (table, data, id) => {
    console.log(table, data, id)
    if (id) {
        data.id = id;
    }
    return await supabase.from(table).upsert(data).select()
}

const drop: DropInterface = async (table, id) => {
    return await supabase.from(table).delete().eq("id", id);
}

const get: GetInterface = async (table, conditions) => {
    let query = supabase.from(table).select()

    if (conditions && conditions.length > 0) {
        for (let condition of conditions) {
            query = query.eq(condition.field, condition.value)
        }
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        throw error;
    }
    return data[0];
}

const list: ListInterface = async (table) => {
    const { data, error } = await supabase.from(table).select().eq("user_id", user.id).order('created_at', { ascending: false });
    if (error) {
        throw error;
    }
    return data;
}

const save: SaveInterface = async (table, data) => {
    update(table, data, null)
}

export {
    save,
    update,
    drop,
    get,
    list,
}