


import { supabase } from '../utils/supabase-client';

export async function checkUserApiLimit(userId: any) {
  try {
    // Get the current user's ID
    

    // if (!userId) {
    //   throw new Error('User not authenticated');
    // }

    // Fetch the user's API limit count from Supabase
    const { data, error } = await supabase
      .from('APICOUNT1')
      .select('count')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching API limit:', error);
      throw new Error('Failed to fetch API limit');
    }

    // If user doesn't exist in the table, count is considered 0
    const currentCount = data?.count || 0;

    // Check if count is less than 5
    return {
      isAllowed: currentCount < 5,
      currentCount: currentCount
    };

  } catch (error) {
    console.error('Error in checkUserApiLimit:', error);
    throw error;
  }
}