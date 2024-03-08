const pg = require ('pg')
const uuid = require ('uuid')
const client = new pg.client(process.env.DATABASE_URL || 'postgress://localhost/acme_reservations_planner_db')

createTable = async ()=>{
    const SQL=`
    DROP TABLE IF EXIST customer 
    DROP TABLE IF EXIST resturant 
    DROP TABLE IF EXIST reservation 
   

    CREATE TABLE customer(
    customer_ID UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL

    )
    CREATE TABLE resturant(
        resturant_ID UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    
        )

        CREATE TABLE reservation(
            reservation_ID UUID PRIMARY KEY,
            resturant_ID UUID PRIMARY KEY,
            party_count INTEGER NOT NULL
            customer_ID UUID REFERENCES customer table NOT NULL,
            
        
            )

    
    `
    const response = await client.query(SQL)
}

const  fetchCustomer = async ()=>{
    const SQL= `
   SELECT * FROM customer
`
    const response = await client.query(SQL,[uuid.v4(),name])
    return response.row[0]
    
}


const  fetchRestaurant = async ()=>{
    const SQL= `
   SELECT * FROM restaurant
`
    const response = await client.query(SQL,[uuid.v4(),name])
    return response.row[0]
    
}


const  fetchReservation = async ()=>{
    const SQL= `
   SELECT * FROM reservation
`
    const response = await client.query(SQL,[uuid.v4(),name])
    return response.row[0]
    
}

const createCustomer = async (name)=>{
    const SQL= `
   INSERT INTO Customer(customer_id,name); 
    VALUES($1,$2)
    RETURNING *;
`
    const response = await client.query(SQL,[uuid.v4(),name])
    return response.row[0]
    
}


const createRestaurant = async (resturant)=>{
    const SQL= `
   ;INSERT INTO restaurant(name); 
    VALUES($1,)
    RETURNING *;
`
    const response = await client.query(SQL,[uuid.v4(),resturant])
    return response.row[0]
    
}

const createReservation = async (party_count_,customer_id,restaurant_id)=>{
    const SQL= `
   INSERT INTO reservation(party_count_,user_id,restaurant_id); 
    VALUES($1,$2,#3)
    RETURNING *;
`
    const response = await client.query(SQL,[party_count_,customer_id,restaurant_id])
    return response.row[0]
    
}

const deleteReservation = async ()=>{
    const SQL= `
  DELETE FROM reservation
  WHERE reservation_id = $1;
`
    const response = await client.query(SQL)
    return response.row[0]
    
}


module.exports = {client,fetchCustomer,fetchRestaurant,fetchReservation,fetchRestaurant,createCustomer,createReservation,createRestaurant,deleteReservation}