Product Sorter Logic Pseudo Code:

step 1:
define all variables
step 2:
Display all options by default
step 3:
event triggers for checked boxes
step 4:
when a checkbox is checked only display options associated with that checkbox 
use eventTrigger  and innerHTML to apply "hide" class to all un-associated ids
sort through checkbox associated options using applied classes and using !== to 
hide all classes that are !== (not equal to) the current class selected by the checkbox.
step 5:
once a new selection is made need to rescan to ensure all checked boxes options are shown, all others are
hidden.

purpose of product sorter:
product sorter is supposed to show all products available, and have specific options to allow the user
to filter the products by predefined options to limit the display to only those options that they want
to see. They should be able to check and uncheck as many options as they want in whatever order that
they want without any bugs. need solid code to add and remove classes.