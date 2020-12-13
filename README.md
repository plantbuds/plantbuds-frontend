PlantBuds  
--  
  
# Quickstart Instruction  
  
## Installation  
For installation, just download the Expo Client App on your phone. It should look something like this in the iOS App Store: 
<img src="https://miro.medium.com/max/2400/1*0hyTqJ_7z9rvXE9qFdcAEg.png" width="400" height="250"/>  
  
After you have installed the Expo app, please use the provided account to login to Expo before scanning the QR code to access the app:  
  
*Note this account is strictly only for the CSE 110 TA's to access and test our app.*  
  
Username: `plantbudstest@gmail.com`  
Password: `YoureWelcomeExclamation110`  
  
## Running the PlantBuds App  
  
Once you have installed Expo, please use your camera app to scan the QR code below using your iPhone X (or above):  
<img src="https://i.imgur.com/QaeLoMe.png" width="300" height="300"/>  
  
You should see a banner that looks like this on your phone screen :   
<img src="https://i.imgur.com/snMpuD7.jpeg" width="200" height="400"/>  
  
Click on the banner to be taken to the landing page of the application after Expo is done building and downloading the JavaScript bundle.  
  
You should then see a screen that should look like the one below afterwards:  
<img src="https://i.imgur.com/DunqwMN.jpeg"  width="200" height="400"/>  
  
And you're ready to test!  
  
## Troubleshooting  
1. *Sometimes theres a `Downloaded with 100%` bar below the screen that doesn't go away on the Plantbuds Landing screen. Is this a bug?*<br/>  
No, this is just Expo's Tunnel downloading the dependencies onto your phone. If the bar does not go away, just shake your phone and this menu should appear: <br/>
<img src="https://docs.expo.io/static/images/developer-menu.png" width="300"> <br/>  
Just press refresh and the app will reload, removing the download bar on the bottom once it is done.  <br />  
  
2.  *I noticed that when I do actions like creating a plant, it takes a while for them to complete, is this normal?* <br/>  
 This is very common and normal. The reason some actions take a long time is because the app is waiting  for a sequence of HTTP requests to be completed, which might take a while. <br />  
   
3. *When I turn off reminders after scheduling a reminder, the reminder still goes off when I am not on the app.*<br />  
  This is a known bug, and unfortunately we are unable to solve this issue currently. The best way to not receive reminders currently is to clear the reminder by pressing clear reminder for whatever plants you do not want to receive a specific reminder for (ie watering, repotting, fertilizing).  
