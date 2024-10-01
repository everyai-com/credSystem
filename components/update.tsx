// import { supabase } from '../';

// async function updateApiLimitCount(userId) {
//   const { data, error } = await supabase
//     .from('user_api_limits')
//     .upsert(
//       { user_id: userId, count: 1 },
//       { 
//         onConflict: 'user_id',
//         update: { count: supabase.raw('user_api_limits.count + 1') }
//       }
//     )
//     .select();

//   if (error) {
//     console.error('Error updating API limit count:', error);
//     return null;
//   }

//   return data[0];
// }