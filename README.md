CS340 Project

### Restructuring the schema:
    - **Customers Table**
        - separated name into firstName and lastName attributes
        - added phoneNumber as a varchar(12) in the format of "123-456-7890"
        - mainly did this for more detail in Customers table
    - **Orders Table**
        - renamed cid to customerID
        - removed *totalPrice* attribute
        - did this to normalize the data, we can get this through JOINS
    - **Records Table**
        - changed 'quantity' to qtyStock
        - more specific attribute name
    - **RecordOrders Table**
        - added 'qtyOrdered' attribute to track how many Records a Customer purchased
    - **DMQ**
        - added queries:
            - totalSpent for all Customers
            - totalSpent for a specific Customer
            - find all Records along with their associated Genre
            - find all Records a Customer has ordered
            - added these for RecordOrders and GenreRecords pages that we need to add based on feedback
    - **DDL**
        - updated dummy data to match changes

**Data manipulation queries that allows users to interact with data**
    - *1 DELETE* - completed
    - *1 DELETE (M:M)* - completed
    - *1 UPDATE* - completed
    - *1 SELECT for every table* - completed
    - *1 INSERT for every table* - completed
    - *1 dynamic drop-down/search*