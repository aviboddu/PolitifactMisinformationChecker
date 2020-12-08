This is the User Guide to the Politifact Misinformation Checker.

To use the Heroku application, all you need to do is go to the URL: 
https://politifactmisinformation.herokuapp.com/

The Heroku app consists of a simple HTML user interface, where you can input a line that you want the program to check for whether it is fact or fiction. It includes a table/key that shows the different types of misinformation, as well as the text color associated with them. Currently, we can only check very specific lines that completely match the title of the page in Politifact. The interface has a bar where you can input the line, and upon checking the line, it prints out the line again with a hyperlink to the Politifact page, and changes the text color to match one of the six different states of misinformation (True, Mostly True, Half True, Mostly False, False, Pants On Fire!), which were taken from Politifact’s rating scale. 

After clicking the Submit button for one statement, the input form is cleared and you can enter another fact to submit and check, which will print out another line of the statement below the previous statement as hyperlinked and colored. 

In the case that the line is not found in the Politifact database, then it will print out a line without the colored text and without a hyperlink. 
