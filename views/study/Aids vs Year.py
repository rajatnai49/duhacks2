import pandas as pd
import matplotlib.pyplot as plt
import mpld3

data = pd.read_csv("Copy File.csv", low_memory=False)

# Replace "Cancer" with the specific disease you want to plot
disease_name = "AIDS"

# Create a figure for each disease
figures = []
disease_data = data[data["Diseases"] == disease_name]

    # Count the occurrences of the disease and create a new DataFrame
disease_counts = disease_data["Date"].value_counts(ascending=False).rename_axis("Years").to_frame("counts")

    # Extract the x and y values for the bar chart
x = disease_counts.index.tolist()
y = disease_counts["counts"].tolist()

fig, ax = plt.subplots()
ax.bar(x, y)
ax.set_title(disease_name + " Graph")
figures.append(fig)
#
# # Create a figure for the age distribution of the disease
# disease_data1 = data[data["Diseases"] == "Diabetes"]
# disease_counts1 = disease_data1["Age"].value_counts(ascending=False).rename_axis("Ages").to_frame("counts")
# x = disease_counts1.index.tolist()
# y = disease_counts1["counts"].tolist()
# fig, ax = plt.subplots()
# ax.bar(x, y)
# ax.set_title("Diabetes Age Distribution")
# figures.append(fig)

# Combine the HTML code for each figure into a single HTML page
html_code = "<html><body>"
for fig in figures:
    html_code += mpld3.fig_to_html(fig) + "<br><br>"
html_code += "</body></html>"

# Save the HTML code to a file
with open("malaria.html", "w") as f:
    f.write(html_code)
