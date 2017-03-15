# Tress Tracker

-----

| Basic Idea:  | A SPA that will allow users to query a database of medical quality wigs. A search will return cards formatted with a photo, name, brand, and average web price. Clicking on a card will bring up a modal with more information. A user can then add a specific wig to a list of owned wigs. Furthermore, the user can add a wig to a ‘wishlist’ than can be further sorted into ‘tried & liked’ or ‘dislike’. User input can be added to each saved wig to make note of color, cap size, and if insurance/HSA was used for wigs marked ‘owned’.  |
| ------ | ------ |

-----

### Problem Addressed
* After experiencing hair loss, buying a wig (for those who choose too) can be completely overwhelming. Trying on in-store is great, but you’ll often pay up to 25% more than buying online. Having a centralized, unbiased (i.e. not a retailer) tool to search for a wig you find in-store and compare the cost to it’s average web price allows a customer to make a more informed decision.
*  For customers who enjoy the personalized service they get in-store, they can utilize the ‘wish list’ function to find a particular style online and have it ordered in their desired color by the store.  
*  For synthetic wigs, the lifespan is around 6 months to a year. For human hair, it’s around 18 months. Many women find they’ve forgotten the brand or specific style name of the wig they purchased a year + ago when they’re ready to replace it. Some women I know utilize spreadsheets to solve the problem, but I feel an SPA would offer a more mobile-friendly solution.

----
### MVP
* Create a database of medical-grade wigs for women
* Users can search a database of medical wigs
* Search can be filtered by brand, hair type (synthetic or human hair), and wig type (partial wigs/toppers or full wigs).
* Users may then add wigs to owned or wish list.
* Wish list can be further separated by “tried and liked” or “tried and disliked”.
* User input for color, cap size, and purchase information can be added when saving to a wig to a user’s profile.
* Resource files section with color explanation and basic care instructions for different hair types (synthetic/human hair).

-----
### Stretch Goals
* Users can rate the wigs they own. This rating can either be private or also be added to the matching wig object that is returned in global search.
* Users can attach images/screen grabs of in-store or online receipts for insurance claims or medical expense tax write-offs.
* Ionic for on-board camera and gallery access for image uploads. Would like to have two complete versions of the app. One with Bootstrap and one with Ionic.
* Google maps to find a shop near you based on zip code.
* When clicking a wig card to view more information, include an option “Find Video Reviews” for the specific wig. Click the button would utilize the Youtube API’s “search result” option. User would be taken to Youtube with the search already populated with “[wig name] reviews”
* *outside of NSS:* present SPA to pool of interested users for feedback.
