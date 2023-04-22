import acquire_data_from_url
import store_in_mongodb
import get_data_from_db
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import uvicorn
import asyncio

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

df = get_data_from_db.get_dataframe_from_db()

# Print information about the loaded data
num_rows = len(df)
num_cols = len(df.columns)
cols = df.columns.tolist()


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    context = {"message": "Hello, World!"}
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "BigMart Sales Data",
            "message": "BigMart Sales Data - Dashboard",
            "num_rows": num_rows,
            "num_cols": num_cols,
        },
    )


@app.get("/dashboard", response_class=HTMLResponse)
async def read_dashboard(request: Request):
    return templates.TemplateResponse(
        "dashboard.html", {"request": request, "title": "Dashboard"}
    )


@app.get("/data")
async def get_all_items():
    return get_data_from_db.get_all_items()


@app.get("/data/{start}/{end}")
async def get_items_range(start: str, end: str):
    return get_data_from_db.get_items_range(start, end)


@app.get("/data/{item_id}")
async def get_item_by_id(item_id: str):
    return get_data_from_db.get_item_by_id(item_id)


# pseudo batch process to update db every 24 hours
def update_database():
    # Load data into dataframe
    df = acquire_data_from_url.import_csv_from_url()

    # Upload data to MongoDB
    store_in_mongodb.upload_dataframe_to_mongodb(df)


# async method to check for update every 24 hour
async def run_scheduler():
    while True:
        await asyncio.sleep(86400)  # Wait 24 hours
        update_database()


if __name__ == "__main__":
    # Initaliaze the database for the first time
    update_database()

    # Start the FastAPI using uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)

    # Asynchronously run the database updates even if the uvicorn server is running
    asyncio.run(run_scheduler())
