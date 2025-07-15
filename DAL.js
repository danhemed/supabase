import supabase from "./db.js";

export async function getAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*');
    if (error) throw error;
    return data;
}

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('*');
    if (error) throw error;
    return data;
}

export async function getUserByName(user_name) {
    const { data: user, error } = await supabase
        .from('users')
        .select('user_name, password')
        .eq('user_name', user_name)
        .single();
    return user;
}

export async function checkUserAndPass(user_name, password) {
    const user = await getUserByName(user_name);
    if (!user || user.password !== password) {
        return false;
    }
    return user && user.password === password;
}