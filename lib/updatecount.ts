import { supabase } from '../utils/supabaseclient';

async function updateUserApiLimit(userId: any) {
  // Check if user exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('APICOUNT1')
    .select('count')
    .eq('user_id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching user API limit:', fetchError);
    return null;
  }

  if (existingUser) {
    // User exists, update count
    const { data, error } = await supabase
      .from('APICOUNT1')
      .update({ count: existingUser.count + 1 })
      .eq('user_id', userId)
      .select();

    if (error) {
      console.error('Error updating user API limit:', error);
      return null;
    }

    return data[0];
  } else {
    // User doesn't exist, insert new row
    const { data, error } = await supabase
      .from('APICOUNT1')
      .insert({ user_id: userId, count: 1,created_at : new Date() })
      .select();

    if (error) {
      console.error('Error inserting user API limit:', error);
      return null;
    }
    console.log(data);

    return data[0];
  }
}

export default updateUserApiLimit;