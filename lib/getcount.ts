import { supabase } from '../utils/supabaseclient';
import { useUser } from "@clerk/nextjs";


export async function getcurrentcount(){
    try{

    
    // const userId1 =useUser()   
    // const userId =userId1?.user
    // console.log(userId)
    const {user} = useUser();
    const userId=user?.id;
    const { data, error } = await supabase
      .from('APICOUNT1')
      .select('count')
      .eq('user_id', userId)
      .single();
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching API limit:', error);
        throw new Error('Failed to fetch API limit');
      }
      const currentCount = data?.count || 0;
      return {
        
        current: currentCount
      };

    }catch (error) {
        console.error('Error in checkUserApiLimit:', error);
        throw error;
      }



}