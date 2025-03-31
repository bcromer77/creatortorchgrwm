import { getAllWorkPlatforms, getProfileEngagement } from '../lib/phyllo';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  console.log("🔍 Getting work platforms...");
  const platforms = await getAllWorkPlatforms();
  console.log("🛠 Available Platforms:\n", JSON.stringify(platforms, null, 2));

  // Uncomment and replace with actual profile ID to test engagement
  // console.log("📊 Fetching engagement for a specific profile...");
  // const engagement = await getProfileEngagement('replace_with_profile_id');
  // console.log(JSON.stringify(engagement, null, 2));
})();
