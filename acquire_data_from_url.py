import pandas as pd
import urllib.request

url = "https://dp-final-project.s3.ca-central-1.amazonaws.com/Train.csv"


def import_csv_from_url():
    # Read the data from the URL using urllib.request
    response = urllib.request.urlopen(url)
    df = pd.read_csv(response)
    print("Data successfully acquired!")
    return df
