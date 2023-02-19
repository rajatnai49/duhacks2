import pandas as pd
import random

arr = [0]

for i in range(2, 318439):
    arr.append(random.randint(2002, 2022))

a = pd.read_csv("Copy File.csv", low_memory=False)
a.insert(5, column="Date", value=arr)

