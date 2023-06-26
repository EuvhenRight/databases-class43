# Answers

1.What columns violate 1NF?

Duplicate value (dinner_id, member_id),
Column value should not change (dinner_date),
Each column should have atomic value, no multiple values(food_code)

2.What entities do you recognize that could be extracted?

(member_name, member_address, dinner_date, venue_description, food_description)

3.Name all the tables and columns that would make a 3NF compliant solution.

(Member table, Dinner table, Venue table, Food table).
