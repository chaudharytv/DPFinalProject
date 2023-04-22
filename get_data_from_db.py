import pymongo
import pandas as pd
from bson import json_util, ObjectId
import json


# Initialize MongoDBClient
connection_string = "mongodb+srv://chaudharytrupal:StrongPWD123@finalproject.i9zzamc.mongodb.net/?retryWrites=true&w=majority"
dbname = "finalproject"
collectionname = "bigmart"

client = pymongo.MongoClient(connection_string)
db = client[dbname]
collection = db[collectionname]


def get_dataframe_from_db():
    # Retrieve data from MongoDB
    cursor = collection.find({})
    df = pd.DataFrame(list(cursor))

    # Drop the _id column if it exists
    if "_id" in df.columns:
        df.drop("_id", axis=1, inplace=True)
    return df


def get_all_items():
    data = collection.find({}, {"_id": 0})
    # Convert the retrieved data to a list of dictionaries
    list_data = list(data)
    # Convert the list of dictionaries to a JSON array
    json_data = json.loads(json_util.dumps(list_data))
    # Return the JSON data
    return json_data


def get_items_range(start_outlet: str, end_outlet: str):
    items = []
    for item in collection.find(
        {
            "Outlet_Identifier": {"$gte": start_outlet, "$lte": end_outlet},
            "_id": {"$not": {"$type": 7}},
        }
    ):
        items.append(item)
    return {"items": items}


def get_item_by_id(item_id: str):
    # Get an item by its ID from the database
    item = collection.find_one({"Item_Identifier": item_id})
    if item is not None:
        item["_id"] = str(item["_id"])  # convert ObjectId to string
        return {"item": item}
    else:
        return {"error": "Item not found"}
