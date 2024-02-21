CS340 Project

***Restructuring the schema:***
1. **Customers Table**
    - separated name into firstName and lastName attributes
    - added phoneNumber as a varchar(12) in the format of "123-456-7890"
    - mainly did this for more detail in Customers table
2. **Orders Table**
    - renamed cid to customerID
    - removed *totalPrice* attribute
    - did this to normalize the data, we can get this through JOINS
3. **Records Table**
    - changed 'quantity' to qtyStock
    - more specific attribute name
4. **RecordOrders Table**
    - added 'qtyOrdered' attribute to track how many Records a Customer purchased
5. **DMQ**
    - added queries:
        - totalSpent for all Customers
        - totalSpent for a specific Customer
        - find all Records along with their associated Genre
        - find all Records a Customer has ordered
        - added these for RecordOrders and GenreRecords pages that we need to add based on feedback
6. **DDL**
    - updated dummy data to match changes

### TODO:
    - add additional css
    - make html look nice by adding spacing
    - add the 'find all Records a Customer has ordered' to Records page (with dropdown selection for Customer)