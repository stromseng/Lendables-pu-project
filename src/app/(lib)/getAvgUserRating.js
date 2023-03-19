import pb from '@/app/(lib)/pocketbase';
//Returns the average rating of a user, rounded to 1 decimal, or 0 if no ratings
export default async function getAvgUserRating(userID) {
  const userRatings = await pb
    .collection('ratings')
    .getFullList(50 /* batch size */, {
      filter: 'userRated = "' + userID + '"',
    });

  let roundedAvgUserRating = 0;

  if (userRatings.length != 0) {
    //Calculate sum of all ratings
    let sum = 0;
    userRatings.forEach((record) => {
      sum += record.rating;
    });
    //Calculate average rating
    const avgUserRating = sum / userRatings.length;

    //Round to 1 decimal
    roundedAvgUserRating = Math.round(avgUserRating * 10) / 10;
  }
  return roundedAvgUserRating;
}
