# HellaWickedFonts
 Steals fonts from google and like, social media's it.
 
 # Build Enviroment
-  [x] PSQL 9.0 +
-  [x] Node 6.5 +
 - [x] NPM 3.10 +

 Probly works on other stuff too, but we didn't test it thats for sure.
 
 # Installing The Database
 After cloning or downloading -
__If Not On Windows__ run this script in a command window in the src folder of the project:

 ```
npm run-script init-load
```
 
If that doesn't work - or on windows
 
1) Run /docs/fontDBSetup.sql

2) Run this command in a command window in the src folder of the project:

```
npm run-script dg
```

3) Do it again (to create the font history for today)

```
npm run-script dg
```
    
4)Run /docs/testData.sql (Optional) 

- This will create a small set of sample data and two user: new (password 123) and memrie (password thing2)
    
# Start This Bad Boy
Run this script in a command window in the src folder of the project

```
npm start
```
