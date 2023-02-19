import sys

import pandas as pd

import matplotlib.pyplot as plt

data = pd.read_csv("Copy File.csv", low_memory=False)
# data1 = data["Diseases"].value_counts(ascending=False).rename_axis("Unique_disease").to_frame("counts")
data2 = data["Date"].value_counts(ascending=False).rename_axis("Years").to_frame("counts")
#
# x = data2["counts"].tolist()
# print(x)
# print(data1)


x = data2.index.tolist()
Age = []
count = 0
for i in x:
    Age[count] = data["Date"] == i | data["Diseases"] == "Cancer"
    count += 1
print(Age)
# y = data["counts"].tolist()
# plt.bar(x, y)
# plt.show()
# plt.savefig(sys.stdout.buffer)
# sys.stdout.flush()
