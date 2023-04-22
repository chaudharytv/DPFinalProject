import pymongo
import pandas as pd

# Initialize MongoDBClient
connection_string = "mongodb+srv://chaudharytrupal:StrongPWD123@finalproject.i9zzamc.mongodb.net/?retryWrites=true&w=majority"
dbname = "finalproject"
collectionname = "bigmart"


def upload_dataframe_to_mongodb(dataframe):
    # Connect to MongoDB
    client = pymongo.MongoClient(connection_string)
    db = client[dbname]
    collection = db[collectionname]

    # Convert dataframe to dictionary
    records = dataframe.to_dict("records")

    # Check if data already exists in collection
    existing_data = collection.find()
    existing_df = pd.DataFrame(list(existing_data))
    existing_df.drop(columns="_id", inplace=True)
    if existing_df.equals(dataframe):
        print("Database Updated - No Entries Affected!")
    else:
        # Remove existing data and insert new data
        collection.delete_many({})
        collection.insert_many(records)

        print("Database Updated with New Data!")
